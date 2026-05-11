<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Purchase\StorePurchaseOrderRequest;
use App\Models\PurchaseOrder;
use App\Services\AuditLogService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PurchaseOrderController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            PurchaseOrder::query()
                ->with(['supplier:id,name', 'warehouse:id,code,name', 'lines.product:id,sku,name'])
                ->latest()
                ->paginate(20)
        );
    }

    public function store(StorePurchaseOrderRequest $request, AuditLogService $auditLogService): JsonResponse
    {
        $payload = $request->validated();

        $purchaseOrder = DB::transaction(function () use ($payload, $request, $auditLogService) {
            $po = PurchaseOrder::create([
                'po_number' => 'PO-'.now()->format('Ymd').'-'.Str::upper(Str::random(6)),
                'supplier_id' => $payload['supplier_id'],
                'warehouse_id' => $payload['warehouse_id'],
                'status' => 'draft',
                'expected_date' => $payload['expected_date'] ?? null,
                'notes' => $payload['notes'] ?? null,
                'created_by' => $request->user()->id,
            ]);

            foreach ($payload['lines'] as $line) {
                $po->lines()->create($line);
            }

            $auditLogService->record($request->user()->id, 'purchase_order.created', $po, [
                'line_count' => count($payload['lines']),
            ], $request);

            return $po->load(['supplier', 'warehouse', 'lines.product']);
        });

        return response()->json($purchaseOrder, 201);
    }
}
