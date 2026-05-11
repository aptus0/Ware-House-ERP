import { Button } from '../components/Button';
import { Card, CardHeader } from '../components/Card';
import { DataTable } from '../components/DataTable';
import { Icon } from '../components/Icon';
import { PageHeader } from '../components/PageHeader';
import { StatusBadge } from '../components/StatusHelpers';
import { warehouseApi } from '../services/warehouseApi';
import { useAsync } from '../hooks/useAsync';
import { formatNumber } from '../utils/format';

export function TransfersPage() {
  const { data } = useAsync(() => warehouseApi.getTransfers(), []);

  return (
    <div className="page-stack">
      <PageHeader title="Transferler" description="Depolar arası ürün transferlerini onay akışıyla yönetin." actions={<Button icon={<Icon name="plus" />}>Yeni Transfer</Button>} />
      <Card>
        <CardHeader title="Transfer Listesi" subtitle="Taslak, yolda ve tamamlanan transfer kayıtları" />
        <DataTable
          data={data ?? []}
          columns={[
            { key: 'code', header: 'Transfer No', render: (row) => <strong>{row.code}</strong> },
            { key: 'product', header: 'Ürün', render: (row) => row.product },
            { key: 'qty', header: 'Miktar', align: 'right', render: (row) => formatNumber(row.quantity) },
            { key: 'from', header: 'Çıkış Depo', render: (row) => row.fromWarehouse },
            { key: 'to', header: 'Varış Depo', render: (row) => row.toWarehouse },
            { key: 'requestedBy', header: 'Talep Eden', render: (row) => row.requestedBy },
            { key: 'status', header: 'Durum', render: (row) => <StatusBadge status={row.status} /> },
          ]}
        />
      </Card>
    </div>
  );
}
