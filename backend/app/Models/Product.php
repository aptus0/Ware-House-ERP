<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'sku',
        'name',
        'category',
        'unit',
        'barcode',
        'description',
        'min_stock_level',
        'is_active',
    ];

    protected $casts = [
        'min_stock_level' => 'integer',
        'is_active' => 'boolean',
    ];

    public function stockItems(): HasMany
    {
        return $this->hasMany(StockItem::class);
    }
}
