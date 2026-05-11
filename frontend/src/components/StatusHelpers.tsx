import { Badge } from './Badge';

export function StockMovementType({ type }: { type: string }) {
  const map: Record<string, { label: string; variant: 'success' | 'warning' | 'info' | 'neutral' }> = {
    in: { label: 'Giriş', variant: 'success' },
    out: { label: 'Çıkış', variant: 'warning' },
    transfer: { label: 'Transfer', variant: 'info' },
    adjustment: { label: 'Düzeltme', variant: 'neutral' },
  };
  const item = map[type] ?? { label: type, variant: 'neutral' };
  return <Badge variant={item.variant}>{item.label}</Badge>;
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral' }> = {
    active: { label: 'Aktif', variant: 'success' },
    passive: { label: 'Pasif', variant: 'neutral' },
    maintenance: { label: 'Bakımda', variant: 'warning' },
    completed: { label: 'Tamamlandı', variant: 'success' },
    pending: { label: 'Bekliyor', variant: 'warning' },
    failed: { label: 'Hatalı', variant: 'danger' },
    draft: { label: 'Taslak', variant: 'neutral' },
    in_transit: { label: 'Yolda', variant: 'info' },
    cancelled: { label: 'İptal', variant: 'danger' },
    ordered: { label: 'Sipariş Verildi', variant: 'info' },
    received: { label: 'Teslim Alındı', variant: 'success' },
    planned: { label: 'Planlandı', variant: 'neutral' },
    in_progress: { label: 'Devam Ediyor', variant: 'warning' },
    closed: { label: 'Kapandı', variant: 'success' },
  };
  const item = map[status] ?? { label: status, variant: 'neutral' };
  return <Badge variant={item.variant}>{item.label}</Badge>;
}
