import { Button } from '../components/Button';
import { Card, CardHeader } from '../components/Card';
import { DataTable } from '../components/DataTable';
import { Icon } from '../components/Icon';
import { PageHeader } from '../components/PageHeader';
import { StatusBadge } from '../components/StatusHelpers';
import { warehouseApi } from '../services/warehouseApi';
import { useAsync } from '../hooks/useAsync';
import { formatNumber } from '../utils/format';

export function ProductsPage() {
  const { data } = useAsync(() => warehouseApi.getProducts(), []);

  return (
    <div className="page-stack">
      <PageHeader
        title="Ürünler"
        description="SKU, kategori, güvenli stok ve mevcut stok bilgilerini yönetin."
        actions={<Button icon={<Icon name="plus" />}>Yeni Ürün</Button>}
      />
      <Card>
        <CardHeader title="Ürün Listesi" subtitle="Kurumsal ürün master data yönetimi" action={<Button variant="secondary" icon={<Icon name="download" />}>Export</Button>} />
        <DataTable
          data={data ?? []}
          columns={[
            { key: 'sku', header: 'SKU', render: (row) => <strong>{row.sku}</strong> },
            { key: 'name', header: 'Ürün', render: (row) => row.name },
            { key: 'category', header: 'Kategori', render: (row) => row.category },
            { key: 'stock', header: 'Stok', align: 'right', render: (row) => formatNumber(row.stock) },
            { key: 'safetyStock', header: 'Güvenli Stok', align: 'right', render: (row) => formatNumber(row.safetyStock) },
            { key: 'status', header: 'Durum', render: (row) => <StatusBadge status={row.status} /> },
          ]}
        />
      </Card>
    </div>
  );
}
