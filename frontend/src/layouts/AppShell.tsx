import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import type { PageKey } from '../pages/pageRegistry';
import { renderPage } from '../pages/pageRegistry';

export function AppShell() {
  const [page, setPage] = useState<PageKey>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar currentPage={page} onNavigate={(nextPage) => { setPage(nextPage); setSidebarOpen(false); }} isOpen={sidebarOpen} />
      <div className="main-panel">
        <Topbar onMenuClick={() => setSidebarOpen((value) => !value)} />
        <main className="content-area">{renderPage(page)}</main>
      </div>
    </div>
  );
}
