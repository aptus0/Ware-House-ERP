<?php

namespace App\Http\Requests\Warehouse;

use Illuminate\Foundation\Http\FormRequest;

class StoreWarehouseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasRole('admin', 'manager') ?? false;
    }

    public function rules(): array
    {
        return [
            'code' => ['required', 'string', 'max:40', 'alpha_dash', 'unique:warehouses,code'],
            'name' => ['required', 'string', 'max:180'],
            'address' => ['nullable', 'string', 'max:1000'],
            'manager_name' => ['nullable', 'string', 'max:120'],
            'is_active' => ['boolean'],
        ];
    }
}
