<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Product;
use App\Services\AuditLogService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::query()->withSum('stockItems as total_stock', 'quantity');

        if ($search = $request->string('search')->trim()->toString()) {
            $query->where(function ($q) use ($search) {
                $q->where('sku', 'like', "%{$search}%")
                    ->orWhere('name', 'like', "%{$search}%")
                    ->orWhere('barcode', 'like', "%{$search}%");
            });
        }

        return response()->json($query->latest()->paginate(20));
    }

    public function store(StoreProductRequest $request, AuditLogService $auditLogService): JsonResponse
    {
        $product = Product::create($request->validated());
        $auditLogService->record($request->user()->id, 'product.created', $product, $product->toArray(), $request);

        return response()->json($product, 201);
    }

    public function show(Product $product): JsonResponse
    {
        return response()->json($product->load(['stockItems.warehouse']));
    }

    public function update(UpdateProductRequest $request, Product $product, AuditLogService $auditLogService): JsonResponse
    {
        $product->update($request->validated());
        $auditLogService->record($request->user()->id, 'product.updated', $product, $request->validated(), $request);

        return response()->json($product->refresh());
    }

    public function destroy(Request $request, Product $product, AuditLogService $auditLogService): JsonResponse
    {
        abort_unless($request->user()->hasRole('admin'), 403, 'Only admins can delete products.');

        $product->delete();
        $auditLogService->record($request->user()->id, 'product.deleted', $product, [], $request);

        return response()->json(['message' => 'Product deleted.']);
    }
}
