<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Supplier\StoreSupplierRequest;
use App\Models\Supplier;
use App\Services\AuditLogService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Supplier::query()->latest()->paginate(20));
    }

    public function store(StoreSupplierRequest $request, AuditLogService $auditLogService): JsonResponse
    {
        $supplier = Supplier::create($request->validated());
        $auditLogService->record($request->user()->id, 'supplier.created', $supplier, $supplier->toArray(), $request);

        return response()->json($supplier, 201);
    }

    public function show(Supplier $supplier): JsonResponse
    {
        return response()->json($supplier->load('purchaseOrders'));
    }

    public function update(StoreSupplierRequest $request, Supplier $supplier, AuditLogService $auditLogService): JsonResponse
    {
        $supplier->update($request->validated());
        $auditLogService->record($request->user()->id, 'supplier.updated', $supplier, $request->validated(), $request);

        return response()->json($supplier->refresh());
    }

    public function destroy(Request $request, Supplier $supplier, AuditLogService $auditLogService): JsonResponse
    {
        abort_unless($request->user()->hasRole('admin'), 403, 'Only admins can delete suppliers.');

        $supplier->delete();
        $auditLogService->record($request->user()->id, 'supplier.deleted', $supplier, [], $request);

        return response()->json(['message' => 'Supplier deleted.']);
    }
}
