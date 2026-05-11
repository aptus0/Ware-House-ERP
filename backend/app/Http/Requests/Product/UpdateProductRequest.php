<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasRole('admin', 'manager') ?? false;
    }

    public function rules(): array
    {
        $productId = $this->route('product')?->id;

        return [
            'sku' => ['sometimes', 'required', 'string', 'max:80', 'alpha_dash', Rule::unique('products', 'sku')->ignore($productId)],
            'name' => ['sometimes', 'required', 'string', 'max:180'],
            'category' => ['nullable', 'string', 'max:120'],
            'unit' => ['sometimes', 'required', Rule::in(['pcs', 'box', 'kg', 'lt', 'meter'])],
            'barcode' => ['nullable', 'string', 'max:120', Rule::unique('products', 'barcode')->ignore($productId)],
            'description' => ['nullable', 'string', 'max:2000'],
            'min_stock_level' => ['sometimes', 'required', 'integer', 'min:0', 'max:999999'],
            'is_active' => ['boolean'],
        ];
    }
}
