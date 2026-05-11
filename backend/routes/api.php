<?php

use App\Http\Controllers\Api\AuditLogController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\InventoryCountController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\PurchaseOrderController;
use App\Http\Controllers\Api\StockMovementController;
use App\Http\Controllers\Api\StockTransferController;
use App\Http\Controllers\Api\SupplierController;
use App\Http\Controllers\Api\WarehouseController;
use Illuminate\Support\Facades\Route;

Route::middleware('throttle:10,1')->post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum', 'throttle:120,1'])->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/dashboard', DashboardController::class);

    Route::apiResource('products', ProductController::class);
    Route::apiResource('warehouses', WarehouseController::class);
    Route::apiResource('suppliers', SupplierController::class);

    Route::get('/stock-movements', [StockMovementController::class, 'index']);
    Route::post('/stock-movements', [StockMovementController::class, 'store']);

    Route::get('/transfers', [StockTransferController::class, 'index']);
    Route::post('/transfers', [StockTransferController::class, 'store']);
    Route::post('/transfers/{transfer}/approve', [StockTransferController::class, 'approve']);
    Route::post('/transfers/{transfer}/complete', [StockTransferController::class, 'complete']);

    Route::get('/purchase-orders', [PurchaseOrderController::class, 'index']);
    Route::post('/purchase-orders', [PurchaseOrderController::class, 'store']);

    Route::get('/inventory-counts', [InventoryCountController::class, 'index']);
    Route::post('/inventory-counts', [InventoryCountController::class, 'store']);
    Route::post('/inventory-counts/{inventoryCount}/complete', [InventoryCountController::class, 'complete']);

    Route::get('/audit-logs', AuditLogController::class)->middleware('can:viewAuditLogs,App\\Models\\AuditLog');
});
