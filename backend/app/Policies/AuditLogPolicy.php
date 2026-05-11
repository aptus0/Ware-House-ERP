<?php

namespace App\Policies;

use App\Models\AuditLog;
use App\Models\User;

class AuditLogPolicy
{
    public function viewAuditLogs(User $user): bool
    {
        return $user->hasRole('admin', 'manager');
    }
}
