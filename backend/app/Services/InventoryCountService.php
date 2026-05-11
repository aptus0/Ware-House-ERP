<?php

namespace App\Services;

use App\Models\InventoryCount;
use App\Models\Product;
use App\Models\Warehouse;
use DomainException;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class InventoryCountService
{
    public function __construct(
        private readonly StockService $stockService,
        private readonly AuditLogService $auditLogService
    ) {
    }

    public function create(array $payload, int $userId): InventoryCount
    {
        return DB::transaction(function () use ($payload, $userId) {
            $count = InventoryCount::create([
                'count_number' => 'CNT-'.now()->format('Ymd').'-'.Str::upper(Str::random(6)),
                'warehouse_id' => $payload['warehouse_id'],
                'status' => 'draft',
                'notes' => $payload['notes'] ?? null,
                'created_by' => $userId,
            ]);

            foreach ($payload['lines'] as $line) {
                $systemQuantity = $this->stockService->getQuantity($line['product_id'], $payload['warehouse_id']);

                $count->lines()->create([
                    'product_id' => $line['product_id'],
                    'system_quantity' => $systemQuantity,
                    'counted_quantity' => $line['counted_quantity'],
                    'difference_quantity' => $line['counted_quantity'] - $systemQuantity,
                ]);
            }

            $this->auditLogService->record($userId, 'inventory_count.created', $count);

            return $count->load(['warehouse', 'lines.product']);
        });
    }

    public function complete(InventoryCount $count, int $userId): InventoryCount
    {
        if ($count->status !== 'draft') {
            throw new DomainException('Only draft inventory counts can be completed.');
        }

        return DB::transaction(function () use ($count, $userId) {
            $warehouse = Warehouse::findOrFail($count->warehouse_id);

            $count->load('lines');
            foreach ($count->lines as $line) {
                $product = Product::findOrFail($line->product_id);
                $this->stockService->move(
                    product: $product,
                    warehouse: $warehouse,
                    type: 'adjustment',
                    quantity: $line->counted_quantity,
                    userId: $userId,
                    reason: 'Inventory count adjustment',
                    referenceType: InventoryCount::class,
                    referenceId: $count->id
                );
            }

            $count->update([
                'status' => 'completed',
                'completed_by' => $userId,
                'completed_at' => Carbon::now(),
            ]);

            $this->auditLogService->record($userId, 'inventory_count.completed', $count);

            return $count->refresh()->load(['warehouse', 'lines.product']);
        });
    }
}
