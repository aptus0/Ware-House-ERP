import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { useAuth } from '../context/AuthContext';

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, signOut } = useAuth();

  return (
    <header className="topbar">
      <button className="topbar__menu" type="button" onClick={onMenuClick} aria-label="Menüyü aç/kapat">
        <Icon name="menu" />
      </button>
      <div className="search-box">
        <Icon name="search" size={18} />
        <input type="search" placeholder="Ara..." aria-label="Ara" />
      </div>
      <div className="topbar__actions">
        <button className="icon-button" type="button" aria-label="Bildirimler">
          <Icon name="bell" />
          <span />
        </button>
        <div className="user-menu">
          <div className="avatar">{user?.name.slice(0, 1) ?? 'U'}</div>
          <div>
            <strong>{user?.name}</strong>
            <span>{user?.role}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" icon={<Icon name="logout" size={16} />} onClick={signOut}>
          Çıkış
        </Button>
      </div>
    </header>
  );
}
