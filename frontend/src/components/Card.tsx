import type { ReactNode } from 'react';
import { classNames } from '../utils/format';

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={classNames('card', className)}>{children}</section>;
}

export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="card-header">
      <div>
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
