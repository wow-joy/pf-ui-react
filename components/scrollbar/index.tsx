import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import type { ScrollbarProps } from './interface';

const Scrollbar = React.forwardRef<HTMLDivElement, ScrollbarProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    trigger = 'hover',
    xScrollable,
    yScrollable = true,
    className,
    style,
    children,
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('scrollbar', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-trigger-hover`]: trigger === 'hover',
      [`${prefixCls}-trigger-rtl`]: direction === 'rtl',
      [`${prefixCls}-x-scroll`]: xScrollable,
      [`${prefixCls}-y-scroll`]: yScrollable,
    },
    className,
    hashId,
  );

  return wrapSSR(
    <div ref={ref} className={cls} style={style}>
      {children}
    </div>,
  );
});

if (process.env.NODE_ENV !== 'production') {
  Scrollbar.displayName = 'Scrollbar';
}

export default Scrollbar;
