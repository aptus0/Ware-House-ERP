<?php

namespace App\Services;

use App\Models\Product;
use App\Models\StockItem;
use App\Models\StockMovement;
use App\Models\StockTransfer;
use App\Models\Warehouse;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    public function summary(): array
    {
        $lowStockCount = StockItem::query()
            ->join('products', 'stock_items.product_id', '=', 'products.id')
            ->whereColumn('stock_items.quantity', '<=', 'products.min_stock_level')
            ->count();

        return [
            'total_products' => Product::count(),
            'active_warehouses' => Warehouse::where('is_active', true)->count(),
            'total_stock_quantity' => (int) StockItem::sum('quantity'),
            'low_stock_count' => $lowStockCount,
            'pending_transfers' => StockTransfer::whereIn('status', ['draft', 'approved'])->count(),
            'recent_movements' => StockMovement::query()
                ->with(['product:id,sku,name', 'warehouse:id,code,name'])
                ->latest()
                ->limit(10)
                ->get(),
            'stock_by_warehouse' => StockItem::query()
                ->select('warehouses.name', DB::raw('SUM(stock_items.quantity) as total_quantity'))
                ->join('warehouses', 'stock_items.warehouse_id', '=', 'warehouses.id')
                ->groupBy('warehouses.name')
                ->orderBy('warehouses.name')
                ->get(),
        ];
    }
}
