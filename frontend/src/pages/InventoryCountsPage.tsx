import { Button } from '../components/Button';
import { Card, CardHeader } from '../components/Card';
import { DataTable } from '../components/DataTable';
import { Icon } from '../components/Icon';
import { PageHeader } from '../components/PageHeader';
import { StatusBadge } from '../components/StatusHelpers';
import { inventoryCounts } from '../data/mockData';

export function InventoryCountsPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Sayım İşlemleri" description="Depo bazlı envanter sayımı ve fark analizi." actions={<Button icon={<Icon name="plus" />}>Yeni Sayım</Button>} />
      <Card>
        <CardHeader title="Sayım Planları" subtitle="Planlanan ve kapanan sayım operasyonları" />
        <DataTable
          data={inventoryCounts}
          columns={[
            { key: 'code', header: 'Sayım No', render: (row) => <strong>{row.code}</strong> },
            { key: 'warehouse', header: 'Depo', render: (row) => row.warehouse },
            { key: 'date', header: 'Plan Tarihi', render: (row) => row.plannedDate },
            { key: 'items', header: 'Sayılmış Kalem', align: 'right', render: (row) => row.countedItems },
            { key: 'variance', header: 'Fark', align: 'right', render: (row) => row.variance },
            { key: 'status', header: 'Durum', render: (row) => <StatusBadge status={row.status} /> },
          ]}
        />
      </Card>
    </div>
  );
}
