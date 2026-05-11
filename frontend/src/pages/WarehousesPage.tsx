import { Button } from '../components/Button';
import { Card, CardHeader } from '../components/Card';
import { DataTable } from '../components/DataTable';
import { Icon } from '../components/Icon';
import { PageHeader } from '../components/PageHeader';
import { StatusBadge } from '../components/StatusHelpers';
import { warehouseApi } from '../services/warehouseApi';
import { useAsync } from '../hooks/useAsync';
import { formatCurrency } from '../utils/format';

export function WarehousesPage() {
  const { data } = useAsync(() => warehouseApi.getWarehouses(), []);

  return (
    <div className="page-stack">
      <PageHeader title="Depolar" description="Fiziksel depo, lokasyon ve kapasite kullanım yönetimi." actions={<Button icon={<Icon name="plus" />}>Yeni Depo</Button>} />
      <Card>
        <CardHeader title="Depo Listesi" subtitle="Depo operasyon sağlığı ve stok değeri" />
        <DataTable
          data={data ?? []}
          columns={[
            { key: 'code', header: 'Kod', render: (row) => <strong>{row.code}</strong> },
            { key: 'name', header: 'Depo', render: (row) => row.name },
            { key: 'city', header: 'Şehir', render: (row) => row.city },
            { key: 'manager', header: 'Sorumlu', render: (row) => row.manager },
            { key: 'value', header: 'Stok Değeri', align: 'right', render: (row) => formatCurrency(row.stockValue) },
            { key: 'utilization', header: 'Kapasite', render: (row) => <div className="progress"><span style={{ width: `${row.utilization}%` }} /> <b>{row.utilization}%</b></div> },
            { key: 'status', header: 'Durum', render: (row) => <StatusBadge status={row.status} /> },
          ]}
        />
      </Card>
    </div>
  );
}
