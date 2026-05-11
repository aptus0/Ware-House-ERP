export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand-logo" aria-label="WarehousePro">
      <div className="brand-mark">
        <svg viewBox="0 0 44 44" role="img" aria-hidden="true">
          <rect x="7" y="8" width="30" height="28" rx="8" fill="url(#wp-gradient)" />
          <path d="M15 17.5 22 13l7 4.5v9L22 31l-7-4.5v-9Z" fill="white" opacity="0.95" />
          <path d="M22 13v18M15 17.5l7 4.5 7-4.5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="wp-gradient" x1="8" y1="8" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" />
              <stop offset="1" stopColor="#14B8A6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {!compact && (
        <div>
          <strong>WarehousePro</strong>
          <span>ERP</span>
        </div>
      )}
    </div>
  );
}
