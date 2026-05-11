<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Transfer\StoreTransferRequest;
use App\Models\StockTransfer;
use App\Services\StockTransferService;
use DomainException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StockTransferController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            StockTransfer::query()
                ->with(['sourceWarehouse:id,code,name', 'destinationWarehouse:id,code,name', 'lines.product:id,sku,name'])
                ->latest()
                ->paginate(20)
        );
    }

    public function store(StoreTransferRequest $request, StockTransferService $service): JsonResponse
    {
        $transfer = $service->create($request->validated(), $request->user()->id);

        return response()->json($transfer, 201);
    }

    public function approve(Request $request, StockTransfer $transfer, StockTransferService $service): JsonResponse
    {
        abort_unless($request->user()->hasRole('admin', 'manager'), 403, 'Only managers or admins can approve transfers.');

        try {
            return response()->json($service->approve($transfer, $request->user()->id));
        } catch (DomainException $exception) {
            return response()->json(['message' => $exception->getMessage()], 422);
        }
    }

    public function complete(Request $request, StockTransfer $transfer, StockTransferService $service): JsonResponse
    {
        abort_unless($request->user()->hasRole('admin', 'manager'), 403, 'Only managers or admins can complete transfers.');

        try {
            return response()->json($service->complete($transfer, $request->user()->id));
        } catch (DomainException $exception) {
            return response()->json(['message' => $exception->getMessage()], 422);
        }
    }
}
