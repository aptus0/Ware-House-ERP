import { DashboardPage } from './DashboardPage';
import { InventoryCountsPage } from './InventoryCountsPage';
import { ProductsPage } from './ProductsPage';
import { PurchaseOrdersPage } from './PurchaseOrdersPage';
import { ReportsPage } from './ReportsPage';
import { SettingsPage } from './SettingsPage';
import { StockMovementsPage } from './StockMovementsPage';
import { TransfersPage } from './TransfersPage';
import { UsersPage } from './UsersPage';
import { WarehousesPage } from './WarehousesPage';

export type PageKey = 'dashboard' | 'products' | 'warehouses' | 'stockMovements' | 'transfers' | 'purchaseOrders' | 'inventoryCounts' | 'reports' | 'users' | 'settings';

export function renderPage(page: PageKey) {
  const pages: Record<PageKey, JSX.Element> = {
    dashboard: <DashboardPage />,
    products: <ProductsPage />,
    warehouses: <WarehousesPage />,
    stockMovements: <StockMovementsPage />,
    transfers: <TransfersPage />,
    purchaseOrders: <PurchaseOrdersPage />,
    inventoryCounts: <InventoryCountsPage />,
    reports: <ReportsPage />,
    users: <UsersPage />,
    settings: <SettingsPage />,
  };
  return pages[page];
}
