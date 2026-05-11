import { Card, CardHeader } from '../components/Card';
import { DataTable } from '../components/DataTable';
import { PageHeader } from '../components/PageHeader';
import { Badge } from '../components/Badge';
import { demoUsers } from '../data/mockData';

export function UsersPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Kullanıcılar" description="Rol bazlı erişim, kullanıcı ve yetki yönetimi." />
      <Card>
        <CardHeader title="Sistem Kullanıcıları" subtitle="Admin, manager ve operator rolleri" />
        <DataTable
          data={demoUsers}
          columns={[
            { key: 'name', header: 'Ad Soyad', render: (row) => <strong>{row.name}</strong> },
            { key: 'email', header: 'E-posta', render: (row) => row.email },
            { key: 'role', header: 'Rol', render: (row) => <Badge variant={row.role === 'admin' ? 'info' : row.role === 'manager' ? 'success' : 'neutral'}>{row.role}</Badge> },
          ]}
        />
      </Card>
    </div>
  );
}
