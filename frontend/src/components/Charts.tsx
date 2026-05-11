interface Point {
  label: string;
  value: number;
}

export function AreaChart({ data }: { data: Point[] }) {
  const width = 620;
  const height = 220;
  const padding = 28;
  const max = Math.max(...data.map((item) => item.value));
  const points = data.map((item, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1);
    const y = height - padding - (item.value / max) * (height - padding * 2);
    return { ...item, x, y };
  });
  const line = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`).join(' ');
  const area = `${line} L${width - padding},${height - padding} L${padding},${height - padding} Z`;

  return (
    <svg className="chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Stok durumu grafiği">
      <defs>
        <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((lineIndex) => {
        const y = padding + lineIndex * ((height - padding * 2) / 3);
        return <line key={lineIndex} x1={padding} x2={width - padding} y1={y} y2={y} className="chart-grid" />;
      })}
      <path d={area} fill="url(#areaFill)" />
      <path d={line} className="chart-line" />
      {points.map((point) => (
        <g key={point.label}>
          <circle cx={point.x} cy={point.y} r="4" className="chart-dot" />
          <text x={point.x} y={height - 6} textAnchor="middle" className="chart-label">{point.label}</text>
        </g>
      ))}
    </svg>
  );
}

export function DonutChart({ data }: { data: Point[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let offset = 25;
  const colors = ['#2563eb', '#14b8a6', '#64748b', '#f59e0b'];

  return (
    <div className="donut-row">
      <svg viewBox="0 0 42 42" className="donut" aria-label="Stok dağılımı grafiği">
        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#e5e7eb" strokeWidth="7" />
        {data.map((item, index) => {
          const dash = (item.value / total) * 100;
          const circle = <circle key={item.label} cx="21" cy="21" r="15.915" fill="transparent" stroke={colors[index % colors.length]} strokeWidth="7" strokeDasharray={`${dash} ${100 - dash}`} strokeDashoffset={offset} />;
          offset -= dash;
          return circle;
        })}
      </svg>
      <div className="donut-legend">
        {data.map((item, index) => (
          <div key={item.label}>
            <span style={{ background: colors[index % colors.length] }} />
            {item.label}
            <strong>{item.value}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
