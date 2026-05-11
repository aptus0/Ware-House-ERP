import { AreaChart, DonutChart } from '../components/Charts';
import { Card, CardHeader } from '../components/Card';
import { DataTable } from '../components/DataTable';
import { Icon } from '../components/Icon';
import { PageHeader } from '../components/PageHeader';
import { StatCard } from '../components/StatCard';
import { StatusBadge, StockMovementType } from '../components/StatusHelpers';
import { stockMovements, stockTrend, warehouseDistribution, products } from '../data/mockData';
import { warehouseApi } from '../services/warehouseApi';
import { useAsync } from '../hooks/useAsync';
import { formatCurrency, formatNumber } from '../utils/format';

export function DashboardPage() {
  const { data: metrics } = useAsync(() => warehouseApi.getDashboard(), []);
  const lowStockProducts = products.filter((product) => product.stock <= product.safetyStock + 10);

  return (
    <div className="page-stack">
      <PageHeader
        title="Dashboard"
        description="Depo operasyonları, stok sağlığı ve günlük hareketler için merkezi görünüm."
      />

      <div className="stats-grid">
        <StatCard label="Toplam Ürün" value={formatNumber(metrics?.totalProducts ?? 0)} trend="+12%" icon={<Icon name="box" />} />
        <StatCard label="Toplam Stok" value={formatNumber(metrics?.totalStock ?? 0)} trend="+8%" icon={<Icon name="activity" />} />
        <StatCard label="Depo Sayısı" value={formatNumber(metrics?.warehouseCount ?? 0)} trend="Aktif" icon={<Icon name="warehouse" />} />
        <StatCard label="Bekleyen Transfer" value={formatNumber(metrics?.pendingTransfers ?? 0)} trend="+5%" icon={<Icon name="transfer" />} />
        <StatCard label="Stok Değeri" value={formatCurrency(metrics?.stockValue ?? 0)} trend="Bu ay" icon={<Icon name="report" />} />
      </div>

      <div className="dashboard-grid">
        <Card className="dashboard-grid__wide">
          <CardHeader title="Stok Durumu" subtitle="Son 6 ay toplam stok hareket trendi" />
          <AreaChart data={stockTrend} />
        </Card>
        <Card>
          <CardHeader title="Stok Dağılımı" subtitle="Depo bazlı yüzde dağılım" />
          <DonutChart data={warehouseDistribution} />
        </Card>
      </div>

      <div className="dashboard-grid">
        <Card className="dashboard-grid__wide">
          <CardHeader title="Son Hareketler" subtitle="En son tamamlanan stok işlemleri" />
          <DataTable
            data={stockMovements.slice(0, 4)}
            columns={[
              { key: 'date', header: 'Tarih', render: (row) => row.date },
              { key: 'product', header: 'Ürün', render: (row) => row.product },
              { key: 'type', header: 'İşlem', render: (row) => <StockMovementType type={row.type} /> },
              { key: 'quantity', header: 'Miktar', align: 'right', render: (row) => formatNumber(row.quantity) },
              { key: 'warehouse', header: 'Depo', render: (row) => row.warehouse },
            ]}
          />
        </Card>
        <Card>
          <CardHeader title="Düşük Stok Uyarıları" subtitle={`${lowStockProducts.length} kritik ürün`} />
          <div className="warning-list">
            {lowStockProducts.map((product) => (
              <div key={product.id}>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.sku}</span>
                </div>
                <StatusBadge status={product.stock <= product.safetyStock ? 'pending' : 'active'} />
                <b>Stok: {product.stock}</b>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
