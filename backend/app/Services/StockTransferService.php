<?php

namespace App\Services;

use App\Models\Product;
use App\Models\StockTransfer;
use App\Models\Warehouse;
use DomainException;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class StockTransferService
{
    public function __construct(
        private readonly StockService $stockService,
        private readonly AuditLogService $auditLogService
    ) {
    }

    public function create(array $payload, int $userId): StockTransfer
    {
        return DB::transaction(function () use ($payload, $userId) {
            $transfer = StockTransfer::create([
                'transfer_number' => 'TRF-'.now()->format('Ymd').'-'.Str::upper(Str::random(6)),
                'source_warehouse_id' => $payload['source_warehouse_id'],
                'destination_warehouse_id' => $payload['destination_warehouse_id'],
                'status' => 'draft',
                'notes' => $payload['notes'] ?? null,
                'created_by' => $userId,
            ]);

            foreach ($payload['lines'] as $line) {
                $transfer->lines()->create([
                    'product_id' => $line['product_id'],
                    'quantity' => $line['quantity'],
                ]);
            }

            $this->auditLogService->record($userId, 'transfer.created', $transfer, [
                'line_count' => count($payload['lines']),
            ]);

            return $transfer->load(['lines.product', 'sourceWarehouse', 'destinationWarehouse']);
        });
    }

    public function approve(StockTransfer $transfer, int $userId): StockTransfer
    {
        if ($transfer->status !== 'draft') {
            throw new DomainException('Only draft transfers can be approved.');
        }

        $transfer->update([
            'status' => 'approved',
            'approved_by' => $userId,
            'approved_at' => Carbon::now(),
        ]);

        $this->auditLogService->record($userId, 'transfer.approved', $transfer);

        return $transfer->refresh()->load(['lines.product', 'sourceWarehouse', 'destinationWarehouse']);
    }

    public function complete(StockTransfer $transfer, int $userId): StockTransfer
    {
        if ($transfer->status !== 'approved') {
            throw new DomainException('Only approved transfers can be completed.');
        }

        return DB::transaction(function () use ($transfer, $userId) {
            $transfer->load('lines');

            $sourceWarehouse = Warehouse::findOrFail($transfer->source_warehouse_id);
            $destinationWarehouse = Warehouse::findOrFail($transfer->destination_warehouse_id);

            foreach ($transfer->lines as $line) {
                $product = Product::findOrFail($line->product_id);

                $this->stockService->move(
                    product: $product,
                    warehouse: $sourceWarehouse,
                    type: 'out',
                    quantity: $line->quantity,
                    userId: $userId,
                    reason: 'Warehouse transfer out',
                    referenceType: StockTransfer::class,
                    referenceId: $transfer->id
                );

                $this->stockService->move(
                    product: $product,
                    warehouse: $destinationWarehouse,
                    type: 'in',
                    quantity: $line->quantity,
                    userId: $userId,
                    reason: 'Warehouse transfer in',
                    referenceType: StockTransfer::class,
                    referenceId: $transfer->id
                );
            }

            $transfer->update([
                'status' => 'completed',
                'completed_at' => Carbon::now(),
            ]);

            $this->auditLogService->record($userId, 'transfer.completed', $transfer);

            return $transfer->refresh()->load(['lines.product', 'sourceWarehouse', 'destinationWarehouse']);
        });
    }
}
