<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Inventory\StoreInventoryCountRequest;
use App\Models\InventoryCount;
use App\Services\InventoryCountService;
use DomainException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InventoryCountController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            InventoryCount::query()
                ->with(['warehouse:id,code,name', 'lines.product:id,sku,name'])
                ->latest()
                ->paginate(20)
        );
    }

    public function store(StoreInventoryCountRequest $request, InventoryCountService $service): JsonResponse
    {
        $count = $service->create($request->validated(), $request->user()->id);

        return response()->json($count, 201);
    }

    public function complete(Request $request, InventoryCount $inventoryCount, InventoryCountService $service): JsonResponse
    {
        abort_unless($request->user()->hasRole('admin', 'manager'), 403, 'Only managers or admins can complete inventory counts.');

        try {
            return response()->json($service->complete($inventoryCount, $request->user()->id));
        } catch (DomainException $exception) {
            return response()->json(['message' => $exception->getMessage()], 422);
        }
    }
}
