export type Role = 'admin' | 'manager' | 'operator';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface Paginated<T> {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  category?: string | null;
  unit: string;
  barcode?: string | null;
  min_stock_level: number;
  is_active: boolean;
  total_stock?: number;
}

export interface Warehouse {
  id: number;
  code: string;
  name: string;
  address?: string | null;
  manager_name?: string | null;
  is_active: boolean;
}

export interface StockMovement {
  id: number;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  balance_after: number;
  reason?: string | null;
  created_at: string;
  product?: Pick<Product, 'id' | 'sku' | 'name'>;
  warehouse?: Pick<Warehouse, 'id' | 'code' | 'name'>;
}

export interface DashboardSummary {
  total_products: number;
  active_warehouses: number;
  total_stock_quantity: number;
  low_stock_count: number;
  pending_transfers: number;
  recent_movements: StockMovement[];
  stock_by_warehouse: Array<{ name: string; total_quantity: number }>;
}

export interface Supplier {
  id: number;
  name: string;
  email?: string | null;
  phone?: string | null;
  is_active: boolean;
}
