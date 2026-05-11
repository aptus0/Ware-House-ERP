import { classNames } from '../utils/format';

type Variant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export function Badge({ children, variant = 'neutral' }: { children: React.ReactNode; variant?: Variant }) {
  return <span className={classNames('badge', `badge--${variant}`)}>{children}</span>;
}
