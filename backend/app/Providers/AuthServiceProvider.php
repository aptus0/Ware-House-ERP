<?php

namespace App\Providers;

use App\Models\AuditLog;
use App\Policies\AuditLogPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        AuditLog::class => AuditLogPolicy::class,
    ];
}
