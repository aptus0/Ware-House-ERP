import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { classNames } from '../utils/format';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
  icon?: ReactNode;
}

export function Button({ children, className, variant = 'primary', size = 'md', icon, ...props }: ButtonProps) {
  return (
    <button className={classNames('btn', `btn--${variant}`, `btn--${size}`, className)} {...props}>
      {icon}
      {children}
    </button>
  );
}
