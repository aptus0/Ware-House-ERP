<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Stock\StockMovementRequest;
use App\Models\Product;
use App\Models\StockMovement;
use App\Models\Warehouse;
use App\Services\StockService;
use DomainException;
use Illuminate\Http\JsonResponse;

class StockMovementController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            StockMovement::query()
                ->with(['product:id,sku,name', 'warehouse:id,code,name', 'creator:id,name'])
                ->latest()
                ->paginate(30)
        );
    }

    public function store(StockMovementRequest $request, StockService $stockService): JsonResponse
    {
        $data = $request->validated();

        try {
            $movement = $stockService->move(
                product: Product::findOrFail($data['product_id']),
                warehouse: Warehouse::findOrFail($data['warehouse_id']),
                type: $data['type'],
                quantity: (int) $data['quantity'],
                userId: $request->user()->id,
                reason: $data['reason'] ?? null
            );
        } catch (DomainException $exception) {
            return response()->json(['message' => $exception->getMessage()], 422);
        }

        return response()->json($movement->load(['product', 'warehouse']), 201);
    }
}
