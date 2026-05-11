import { Card, CardHeader } from '../components/Card';
import { PageHeader } from '../components/PageHeader';

export function SettingsPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Ayarlar" description="API bağlantısı, güvenlik ve kurumsal tercih ayarları." />
      <div className="settings-grid">
        <Card><CardHeader title="API Bağlantısı" subtitle="Laravel API: VITE_API_BASE_URL ile yönetilir." /></Card>
        <Card><CardHeader title="Mock Mod" subtitle="VITE_ENABLE_MOCK=false yapıldığında gerçek backend kullanılır." /></Card>
        <Card><CardHeader title="Güvenlik" subtitle="Token localStorage içinde saklanır; production için HttpOnly cookie tercih edilebilir." /></Card>
        <Card><CardHeader title="Tema" subtitle="Kurumsal açık tema, responsive sidebar ve dashboard bileşenleri." /></Card>
      </div>
    </div>
  );
}
