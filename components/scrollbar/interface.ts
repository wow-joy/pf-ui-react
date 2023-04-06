import type { CSSProperties, ReactNode } from 'react';

export interface ScrollbarProps {
  trigger?: 'hover' | 'none';
  xScrollable?: boolean;
  yScrollable?: boolean;
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
