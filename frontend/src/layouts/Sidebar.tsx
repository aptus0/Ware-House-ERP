import { BrandLogo } from '../components/BrandLogo';
import { Icon } from '../components/Icon';
import { classNames } from '../utils/format';
import type { PageKey } from '../pages/pageRegistry';

const navItems: Array<{ key: PageKey; label: string; icon: Parameters<typeof Icon>[0]['name'] }> = [
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { key: 'products', label: 'Ürünler', icon: 'box' },
  { key: 'warehouses', label: 'Depolar', icon: 'warehouse' },
  { key: 'stockMovements', label: 'Stok Hareketleri', icon: 'activity' },
  { key: 'transfers', label: 'Transferler', icon: 'transfer' },
  { key: 'purchaseOrders', label: 'Satın Alma', icon: 'purchase' },
  { key: 'inventoryCounts', label: 'Sayım İşlemleri', icon: 'count' },
  { key: 'reports', label: 'Raporlar', icon: 'report' },
  { key: 'users', label: 'Kullanıcılar', icon: 'users' },
  { key: 'settings', label: 'Ayarlar', icon: 'settings' },
];

interface SidebarProps {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
  isOpen: boolean;
}

export function Sidebar({ currentPage, onNavigate, isOpen }: SidebarProps) {
  return (
    <aside className={classNames('sidebar', isOpen && 'sidebar--open')}>
      <div className="sidebar__brand">
        <BrandLogo />
      </div>
      <nav className="sidebar__nav" aria-label="Ana menü">
        {navItems.map((item) => (
          <button
            key={item.key}
            type="button"
            className={classNames('nav-item', currentPage === item.key && 'nav-item--active')}
            onClick={() => onNavigate(item.key)}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar__security">
        <Icon name="shield" />
        <div>
          <strong>Güvenli Oturum</strong>
          <span>Sanctum token hazır</span>
        </div>
      </div>
    </aside>
  );
}
