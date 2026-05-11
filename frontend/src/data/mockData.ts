import type {
  AuditLog,
  DashboardMetrics,
  InventoryCount,
  Product,
  PurchaseOrder,
  StockMovement,
  Transfer,
  User,
  Warehouse,
} from '../types/domain';

export const demoUsers: User[] = [
  { id: 1, name: 'Samet Admin', email: 'admin@warehousepro.local', role: 'admin' },
  { id: 2, name: 'Mehmet Yılmaz', email: 'manager@warehousepro.local', role: 'manager' },
  { id: 3, name: 'Ayşe Demir', email: 'operator@warehousepro.local', role: 'operator' },
];

export const dashboardMetrics: DashboardMetrics = {
  totalProducts: 1248,
  totalStock: 25430,
  warehouseCount: 8,
  pendingTransfers: 15,
  lowStockCount: 12,
  stockValue: 1842500,
};

export const stockTrend = [
  { label: 'Oca', value: 320 },
  { label: 'Şub', value: 510 },
  { label: 'Mar', value: 430 },
  { label: 'Nis', value: 670 },
  { label: 'May', value: 590 },
  { label: 'Haz', value: 820 },
];

export const warehouseDistribution = [
  { label: 'Depo A', value: 38 },
  { label: 'Depo B', value: 27 },
  { label: 'Depo C', value: 20 },
  { label: 'Depo D', value: 15 },
];

export const products: Product[] = [
  { id: 1, sku: 'LP-STD-001', name: 'Laptop Standı', category: 'Aksesuar', unit: 'Adet', safetyStock: 20, stock: 150, status: 'active' },
  { id: 2, sku: 'MSE-WRL-018', name: 'Kablosuz Mouse', category: 'Elektronik', unit: 'Adet', safetyStock: 35, stock: 30, status: 'active' },
  { id: 3, sku: 'KBD-MCH-144', name: 'Mekanik Klavye', category: 'Elektronik', unit: 'Adet', safetyStock: 15, stock: 8, status: 'active' },
  { id: 4, sku: 'HDMI-2M-090', name: 'HDMI Kablo', category: 'Kablo', unit: 'Adet', safetyStock: 60, stock: 200, status: 'active' },
  { id: 5, sku: 'USB-C-HUB-77', name: 'USB-C Hub', category: 'Aksesuar', unit: 'Adet', safetyStock: 25, stock: 22, status: 'active' },
];

export const warehouses: Warehouse[] = [
  { id: 1, name: 'Merkez Depo', code: 'WH-MAIN', city: 'İstanbul', manager: 'Samet Admin', stockValue: 820000, utilization: 78, status: 'active' },
  { id: 2, name: 'Depo A', code: 'WH-A', city: 'Bursa', manager: 'Mehmet Yılmaz', stockValue: 310000, utilization: 63, status: 'active' },
  { id: 3, name: 'Depo B', code: 'WH-B', city: 'İzmir', manager: 'Ayşe Demir', stockValue: 270000, utilization: 55, status: 'active' },
  { id: 4, name: 'Servis Deposu', code: 'WH-SRV', city: 'Ankara', manager: 'Can Kaya', stockValue: 125000, utilization: 42, status: 'maintenance' },
];

export const stockMovements: StockMovement[] = [
  { id: 1, date: '11.05.2026 14:30', product: 'Laptop Standı', type: 'in', quantity: 150, warehouse: 'Merkez Depo', description: 'Satın alma girişi', performedBy: 'Samet Admin', status: 'completed' },
  { id: 2, date: '11.05.2026 11:20', product: 'Kablosuz Mouse', type: 'out', quantity: 30, warehouse: 'Merkez Depo', description: 'Müşteri siparişi', performedBy: 'Mehmet Yılmaz', status: 'completed' },
  { id: 3, date: '10.05.2026 16:45', product: 'Klavye', type: 'transfer', quantity: 20, warehouse: 'Depo A → Depo B', description: 'Depo transferi', performedBy: 'Ayşe Demir', status: 'completed' },
  { id: 4, date: '10.05.2026 09:15', product: 'HDMI Kablo', type: 'in', quantity: 200, warehouse: 'Depo B', description: 'Tedarikçi girişi', performedBy: 'Samet Admin', status: 'completed' },
];

export const transfers: Transfer[] = [
  { id: 1, code: 'TRF-2026-0001', product: 'Klavye', quantity: 20, fromWarehouse: 'Depo A', toWarehouse: 'Depo B', requestedBy: 'Ayşe Demir', status: 'completed', createdAt: '10.05.2026' },
  { id: 2, code: 'TRF-2026-0002', product: 'USB-C Hub', quantity: 18, fromWarehouse: 'Merkez Depo', toWarehouse: 'Depo A', requestedBy: 'Mehmet Yılmaz', status: 'in_transit', createdAt: '11.05.2026' },
  { id: 3, code: 'TRF-2026-0003', product: 'HDMI Kablo', quantity: 75, fromWarehouse: 'Depo B', toWarehouse: 'Servis Deposu', requestedBy: 'Samet Admin', status: 'draft', createdAt: '11.05.2026' },
];

export const purchaseOrders: PurchaseOrder[] = [
  { id: 1, code: 'PO-2026-0012', supplier: 'Tekno Tedarik A.Ş.', items: 4, total: 185000, status: 'ordered', eta: '15.05.2026' },
  { id: 2, code: 'PO-2026-0013', supplier: 'Marmara Elektronik', items: 2, total: 76000, status: 'received', eta: '09.05.2026' },
  { id: 3, code: 'PO-2026-0014', supplier: 'Bursa Lojistik', items: 6, total: 142500, status: 'draft', eta: '18.05.2026' },
];

export const inventoryCounts: InventoryCount[] = [
  { id: 1, code: 'CNT-2026-001', warehouse: 'Merkez Depo', plannedDate: '14.05.2026', countedItems: 430, variance: 3, status: 'in_progress' },
  { id: 2, code: 'CNT-2026-002', warehouse: 'Depo A', plannedDate: '20.05.2026', countedItems: 0, variance: 0, status: 'planned' },
  { id: 3, code: 'CNT-2026-003', warehouse: 'Depo B', plannedDate: '05.05.2026', countedItems: 280, variance: -2, status: 'closed' },
];

export const auditLogs: AuditLog[] = [
  { id: 1, actor: 'Samet Admin', action: 'LOGIN_SUCCESS', module: 'Auth', ipAddress: '192.168.1.24', createdAt: '11.05.2026 16:30' },
  { id: 2, actor: 'Mehmet Yılmaz', action: 'STOCK_OUT_CREATED', module: 'Stock Movements', ipAddress: '192.168.1.32', createdAt: '11.05.2026 11:20' },
  { id: 3, actor: 'Ayşe Demir', action: 'TRANSFER_COMPLETED', module: 'Transfers', ipAddress: '192.168.1.46', createdAt: '10.05.2026 16:45' },
];
