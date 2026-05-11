<?php

namespace App\Http\Requests\Warehouse;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateWarehouseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasRole('admin', 'manager') ?? false;
    }

    public function rules(): array
    {
        $warehouseId = $this->route('warehouse')?->id;

        return [
            'code' => ['sometimes', 'required', 'string', 'max:40', 'alpha_dash', Rule::unique('warehouses', 'code')->ignore($warehouseId)],
            'name' => ['sometimes', 'required', 'string', 'max:180'],
            'address' => ['nullable', 'string', 'max:1000'],
            'manager_name' => ['nullable', 'string', 'max:120'],
            'is_active' => ['boolean'],
        ];
    }
}
