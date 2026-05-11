<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Warehouse\StoreWarehouseRequest;
use App\Http\Requests\Warehouse\UpdateWarehouseRequest;
use App\Models\Warehouse;
use App\Services\AuditLogService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WarehouseController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Warehouse::query()->withCount('stockItems')->latest()->paginate(20));
    }

    public function store(StoreWarehouseRequest $request, AuditLogService $auditLogService): JsonResponse
    {
        $warehouse = Warehouse::create($request->validated());
        $auditLogService->record($request->user()->id, 'warehouse.created', $warehouse, $warehouse->toArray(), $request);

        return response()->json($warehouse, 201);
    }

    public function show(Warehouse $warehouse): JsonResponse
    {
        return response()->json($warehouse->load(['stockItems.product']));
    }

    public function update(UpdateWarehouseRequest $request, Warehouse $warehouse, AuditLogService $auditLogService): JsonResponse
    {
        $warehouse->update($request->validated());
        $auditLogService->record($request->user()->id, 'warehouse.updated', $warehouse, $request->validated(), $request);

        return response()->json($warehouse->refresh());
    }

    public function destroy(Request $request, Warehouse $warehouse, AuditLogService $auditLogService): JsonResponse
    {
        abort_unless($request->user()->hasRole('admin'), 403, 'Only admins can delete warehouses.');

        $warehouse->delete();
        $auditLogService->record($request->user()->id, 'warehouse.deleted', $warehouse, [], $request);

        return response()->json(['message' => 'Warehouse deleted.']);
    }
}
