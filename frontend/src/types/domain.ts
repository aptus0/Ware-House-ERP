export type Role = 'admin' | 'manager' | 'operator';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
  unit: string;
  safetyStock: number;
  stock: number;
  status: 'active' | 'passive';
}

export interface Warehouse {
  id: number;
  name: string;
  code: string;
  city: string;
  manager: string;
  stockValue: number;
  utilization: number;
  status: 'active' | 'maintenance';
}

export interface StockMovement {
  id: number;
  date: string;
  product: string;
  type: 'in' | 'out' | 'transfer' | 'adjustment';
  quantity: number;
  warehouse: string;
  description: string;
  performedBy: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Transfer {
  id: number;
  code: string;
  product: string;
  quantity: number;
  fromWarehouse: string;
  toWarehouse: string;
  requestedBy: string;
  status: 'draft' | 'in_transit' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface PurchaseOrder {
  id: number;
  code: string;
  supplier: string;
  items: number;
  total: number;
  status: 'draft' | 'ordered' | 'received' | 'cancelled';
  eta: string;
}

export interface InventoryCount {
  id: number;
  code: string;
  warehouse: string;
  plannedDate: string;
  countedItems: number;
  variance: number;
  status: 'planned' | 'in_progress' | 'closed';
}

export interface AuditLog {
  id: number;
  actor: string;
  action: string;
  module: string;
  ipAddress: string;
  createdAt: string;
}

export interface DashboardMetrics {
  totalProducts: number;
  totalStock: number;
  warehouseCount: number;
  pendingTransfers: number;
  lowStockCount: number;
  stockValue: number;
}
