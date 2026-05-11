import {
  auditLogs,
  dashboardMetrics,
  inventoryCounts,
  products,
  purchaseOrders,
  stockMovements,
  transfers,
  warehouses,
} from '../data/mockData';
import type { DashboardMetrics, Product, StockMovement, Transfer, Warehouse } from '../types/domain';
import { request } from './httpClient';

const ENABLE_MOCK = import.meta.env.VITE_ENABLE_MOCK !== 'false';
const delay = <T,>(data: T) => new Promise<T>((resolve) => window.setTimeout(() => resolve(data), 250));

export const warehouseApi = {
  getDashboard: (): Promise<DashboardMetrics> => ENABLE_MOCK ? delay(dashboardMetrics) : request('/dashboard'),
  getProducts: (): Promise<Product[]> => ENABLE_MOCK ? delay(products) : request('/products'),
  getWarehouses: (): Promise<Warehouse[]> => ENABLE_MOCK ? delay(warehouses) : request('/warehouses'),
  getStockMovements: (): Promise<StockMovement[]> => ENABLE_MOCK ? delay(stockMovements) : request('/stock-movements'),
  getTransfers: (): Promise<Transfer[]> => ENABLE_MOCK ? delay(transfers) : request('/transfers'),
  getPurchaseOrders: () => ENABLE_MOCK ? delay(purchaseOrders) : request('/purchase-orders'),
  getInventoryCounts: () => ENABLE_MOCK ? delay(inventoryCounts) : request('/inventory-counts'),
  getAuditLogs: () => ENABLE_MOCK ? delay(auditLogs) : request('/audit-logs'),
};
