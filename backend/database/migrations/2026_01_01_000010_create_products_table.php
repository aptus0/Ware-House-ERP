<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('sku', 80)->unique();
            $table->string('name', 180);
            $table->string('category', 120)->nullable()->index();
            $table->string('unit', 20)->default('pcs');
            $table->string('barcode', 120)->nullable()->unique();
            $table->text('description')->nullable();
            $table->unsignedInteger('min_stock_level')->default(0);
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
