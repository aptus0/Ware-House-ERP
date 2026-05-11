import { Button } from '../components/Button';
import { Card, CardHeader } from '../components/Card';
import { DataTable } from '../components/DataTable';
import { Icon } from '../components/Icon';
import { PageHeader } from '../components/PageHeader';
import { StatusBadge, StockMovementType } from '../components/StatusHelpers';
import { warehouseApi } from '../services/warehouseApi';
import { useAsync } from '../hooks/useAsync';
import { formatNumber } from '../utils/format';

export function StockMovementsPage() {
  const { data } = useAsync(() => warehouseApi.getStockMovements(), []);

  return (
    <div className="page-stack">
      <PageHeader
        title="Stok Hareketleri"
        description="Giriş, çıkış, transfer ve düzeltme hareketlerini güvenli şekilde izleyin."
        actions={<><Button variant="secondary" icon={<Icon name="filter" />}>Filtrele</Button><Button icon={<Icon name="plus" />}>Yeni Hareket</Button></>}
      />
      <Card>
        <CardHeader title="Hareket Geçmişi" subtitle="Audit log destekli stok hareket kayıtları" action={<Button variant="secondary" icon={<Icon name="download" />}>Export</Button>} />
        <DataTable
          data={data ?? []}
          columns={[
            { key: 'date', header: 'Tarih', render: (row) => row.date },
            { key: 'product', header: 'Ürün', render: (row) => row.product },
            { key: 'type', header: 'İşlem Tipi', render: (row) => <StockMovementType type={row.type} /> },
            { key: 'quantity', header: 'Miktar', align: 'right', render: (row) => formatNumber(row.quantity) },
            { key: 'warehouse', header: 'Depo', render: (row) => row.warehouse },
            { key: 'description', header: 'Açıklama', render: (row) => row.description },
            { key: 'user', header: 'İşlem Yapan', render: (row) => row.performedBy },
            { key: 'status', header: 'Durum', render: (row) => <StatusBadge status={row.status} /> },
          ]}
        />
      </Card>
    </div>
  );
}
