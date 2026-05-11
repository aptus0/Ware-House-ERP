import { Button } from '../components/Button';
import { Card, CardHeader } from '../components/Card';
import { DataTable } from '../components/DataTable';
import { Icon } from '../components/Icon';
import { PageHeader } from '../components/PageHeader';
import { StatusBadge } from '../components/StatusHelpers';
import { purchaseOrders } from '../data/mockData';
import { formatCurrency } from '../utils/format';

export function PurchaseOrdersPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Satın Alma" description="Tedarikçi siparişleri ve beklenen mal kabul süreçleri." actions={<Button icon={<Icon name="plus" />}>Yeni Satın Alma</Button>} />
      <Card>
        <CardHeader title="Satın Alma Siparişleri" subtitle="PO takibi ve teslimat planlama" />
        <DataTable
          data={purchaseOrders}
          columns={[
            { key: 'code', header: 'PO No', render: (row) => <strong>{row.code}</strong> },
            { key: 'supplier', header: 'Tedarikçi', render: (row) => row.supplier },
            { key: 'items', header: 'Kalem', align: 'right', render: (row) => row.items },
            { key: 'total', header: 'Tutar', align: 'right', render: (row) => formatCurrency(row.total) },
            { key: 'eta', header: 'Beklenen Tarih', render: (row) => row.eta },
            { key: 'status', header: 'Durum', render: (row) => <StatusBadge status={row.status} /> },
          ]}
        />
      </Card>
    </div>
  );
}
