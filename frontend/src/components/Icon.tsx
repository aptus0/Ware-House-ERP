type IconName = 'dashboard' | 'box' | 'warehouse' | 'activity' | 'transfer' | 'purchase' | 'count' | 'report' | 'users' | 'settings' | 'shield' | 'search' | 'bell' | 'menu' | 'logout' | 'plus' | 'download' | 'filter';

const paths: Record<IconName, string> = {
  dashboard: 'M4 13h7V4H4v9Zm0 7h7v-5H4v5Zm9 0h7v-9h-7v9Zm0-16v5h7V4h-7Z',
  box: 'M21 8.5 12 3 3 8.5v11L12 25l9-5.5v-11ZM12 3v11m0 0 9-5.5M12 14 3 8.5',
  warehouse: 'M3 21V9l9-5 9 5v12h-5v-7H8v7H3Zm6-9h6M9 16h6M9 20h6',
  activity: 'M3 12h4l3-7 4 14 3-7h4',
  transfer: 'M7 7h13l-4-4m4 4-4 4M17 17H4l4 4m-4-4 4-4',
  purchase: 'M6 6h15l-2 9H8L6 6Zm0 0 1-3H3m6 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
  count: 'M7 3h10l4 4v14H7V3Zm9 0v5h5M10 12h8M10 16h8M10 20h5',
  report: 'M5 21V3h14v18H5Zm4-4v-5m4 5V7m4 10v-8',
  users: 'M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m9-10a4 4 0 1 0-8 0 4 4 0 0 0 8 0Zm8 10v-2a4 4 0 0 0-3-3.87m-2-12a4 4 0 0 1 0 7.75',
  settings: 'M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Zm8.5-3.5a6.4 6.4 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a7.2 7.2 0 0 0-1.7-1L16 3h-4l-.4 3.1a7.2 7.2 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.5a6.4 6.4 0 0 0 0 2l-2 1.5 2 3.4 2.4-1a7.2 7.2 0 0 0 1.7 1L12 21h4l.4-3.1a7.2 7.2 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z',
  search: 'M11 19a8 8 0 1 1 5.3-2l4.3 4.3-1.4 1.4-4.3-4.3A8 8 0 0 1 11 19Z',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Zm-8 12a2 2 0 0 0 4 0',
  menu: 'M4 6h16M4 12h16M4 18h16',
  logout: 'M10 17 15 12l-5-5m5 5H3m8 9h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-7',
  plus: 'M12 5v14M5 12h14',
  download: 'M12 3v12m0 0 4-4m-4 4-4-4M4 21h16',
  filter: 'M4 5h16l-6 7v5l-4 2v-7L4 5Z',
};

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
