<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('warehousepro:about', function () {
    $this->info('WarehousePro ERP Kit');
});
