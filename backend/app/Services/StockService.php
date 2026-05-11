<?php

namespace App\Services;

use App\Models\Product;
use App\Models\StockItem;
use App\Models\StockMovement;
use App\Models\Warehouse;
use DomainException;
use Illuminate\Support\Facades\DB;

class StockService
{
    public function __construct(private readonly AuditLogService $auditLogService)
    {
    }

    public function move(
        Product $product,
        Warehouse $warehouse,
        string $type,
        int $quantity,
        int $userId,
        ?string $reason = null,
        ?string $referenceType = null,
        ?int $referenceId = null
    ): StockMovement {
        return DB::transaction(function () use ($product, $warehouse, $type, $quantity, $userId, $reason, $referenceType, $referenceId) {
            $stockItem = StockItem::query()
                ->where('product_id', $product->id)
                ->where('warehouse_id', $warehouse->id)
                ->lockForUpdate()
                ->first();

            if (! $stockItem) {
                $stockItem = StockItem::create([
                    'product_id' => $product->id,
                    'warehouse_id' => $warehouse->id,
                    'quantity' => 0,
                ]);
                $stockItem->refresh();
            }

            $newBalance = match ($type) {
                'in' => $stockItem->quantity + $quantity,
                'out' => $stockItem->quantity - $quantity,
                'adjustment' => $quantity,
                default => throw new DomainException('Unsupported stock movement type.'),
            };

            if ($newBalance < 0) {
                throw new DomainException('Insufficient stock quantity for this operation.');
            }

            $stockItem->update(['quantity' => $newBalance]);

            $movement = StockMovement::create([
                'product_id' => $product->id,
                'warehouse_id' => $warehouse->id,
                'type' => $type,
                'quantity' => $quantity,
                'balance_after' => $newBalance,
                'reason' => $reason,
                'reference_type' => $referenceType,
                'reference_id' => $referenceId,
                'created_by' => $userId,
            ]);

            $this->auditLogService->record($userId, 'stock_movement.created', $movement, [
                'product_id' => $product->id,
                'warehouse_id' => $warehouse->id,
                'type' => $type,
                'quantity' => $quantity,
                'balance_after' => $newBalance,
            ]);

            return $movement;
        });
    }

    public function getQuantity(int $productId, int $warehouseId): int
    {
        return (int) StockItem::query()
            ->where('product_id', $productId)
            ->where('warehouse_id', $warehouseId)
            ->value('quantity');
    }
}
