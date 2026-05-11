<?php

namespace App\Services;

use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class AuditLogService
{
    public function record(?int $userId, string $action, ?object $auditable = null, array $metadata = [], ?Request $request = null): AuditLog
    {
        return AuditLog::create([
            'user_id' => $userId,
            'action' => $action,
            'auditable_type' => $auditable ? $auditable::class : null,
            'auditable_id' => $auditable->id ?? null,
            'ip_address' => $request?->ip(),
            'user_agent' => substr((string) $request?->userAgent(), 0, 1000),
            'metadata' => $metadata,
            'created_at' => Carbon::now(),
        ]);
    }
}
