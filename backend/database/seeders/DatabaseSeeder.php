<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\StockItem;
use App\Models\Supplier;
use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(['email' => 'admin@example.com'], [
            'name' => 'Admin User',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'is_active' => true,
        ]);

        User::updateOrCreate(['email' => 'manager@example.com'], [
            'name' => 'Warehouse Manager',
            'password' => Hash::make('password'),
            'role' => 'manager',
            'is_active' => true,
        ]);

        User::updateOrCreate(['email' => 'operator@example.com'], [
            'name' => 'Warehouse Operator',
            'password' => Hash::make('password'),
            'role' => 'operator',
            'is_active' => true,
        ]);

        $main = Warehouse::updateOrCreate(['code' => 'MAIN'], [
            'name' => 'Main Warehouse',
            'address' => 'Main logistics center',
            'manager_name' => 'Warehouse Manager',
            'is_active' => true,
        ]);

        $retail = Warehouse::updateOrCreate(['code' => 'RETAIL'], [
            'name' => 'Retail Store Warehouse',
            'address' => 'Store back office',
            'manager_name' => 'Store Manager',
            'is_active' => true,
        ]);

        $products = [
            ['sku' => 'SKU-LAPTOP-001', 'name' => 'Business Laptop 14', 'category' => 'Electronics', 'unit' => 'pcs', 'min_stock_level' => 5],
            ['sku' => 'SKU-MOUSE-001', 'name' => 'Wireless Mouse', 'category' => 'Accessories', 'unit' => 'pcs', 'min_stock_level' => 20],
            ['sku' => 'SKU-BOX-001', 'name' => 'Shipping Box Medium', 'category' => 'Packaging', 'unit' => 'box', 'min_stock_level' => 50],
        ];

        foreach ($products as $productData) {
            $product = Product::updateOrCreate(['sku' => $productData['sku']], $productData + ['is_active' => true]);

            StockItem::updateOrCreate([
                'product_id' => $product->id,
                'warehouse_id' => $main->id,
            ], ['quantity' => 100]);

            StockItem::updateOrCreate([
                'product_id' => $product->id,
                'warehouse_id' => $retail->id,
            ], ['quantity' => 10]);
        }

        Supplier::updateOrCreate(['name' => 'Global Tech Supplier'], [
            'email' => 'sales@example-supplier.com',
            'phone' => '+90 555 000 0000',
            'tax_number' => 'SUP-001',
            'address' => 'Supplier address',
            'is_active' => true,
        ]);
    }
}
