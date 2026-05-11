<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasRole('admin', 'manager') ?? false;
    }

    public function rules(): array
    {
        return [
            'sku' => ['required', 'string', 'max:80', 'alpha_dash', 'unique:products,sku'],
            'name' => ['required', 'string', 'max:180'],
            'category' => ['nullable', 'string', 'max:120'],
            'unit' => ['required', Rule::in(['pcs', 'box', 'kg', 'lt', 'meter'])],
            'barcode' => ['nullable', 'string', 'max:120', 'unique:products,barcode'],
            'description' => ['nullable', 'string', 'max:2000'],
            'min_stock_level' => ['required', 'integer', 'min:0', 'max:999999'],
            'is_active' => ['boolean'],
        ];
    }
}
