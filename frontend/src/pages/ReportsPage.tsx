import { AreaChart, DonutChart } from '../components/Charts';
import { Card, CardHeader } from '../components/Card';
import { PageHeader } from '../components/PageHeader';
import { stockTrend, warehouseDistribution } from '../data/mockData';

export function ReportsPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Raporlar" description="Stok değeri, depo dağılımı ve operasyon performans raporları." />
      <div className="dashboard-grid">
        <Card className="dashboard-grid__wide"><CardHeader title="Aylık Stok Trend Raporu" /><AreaChart data={stockTrend} /></Card>
        <Card><CardHeader title="Depo Dağılım Raporu" /><DonutChart data={warehouseDistribution} /></Card>
      </div>
      <div className="insight-grid">
        <Card><CardHeader title="Operasyon Notu" subtitle="Bu ay transfer yoğunluğu %5 arttı. Kritik stok listesi satın alma ekranına aktarılmalı." /></Card>
        <Card><CardHeader title="Risk Notu" subtitle="Güvenli stok altındaki ürünler için otomatik satın alma kuralı önerilir." /></Card>
      </div>
    </div>
  );
}
