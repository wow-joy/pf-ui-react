import SearchOutlined from '@pf-ui/pf-icons-react/SearchOutlined';
import classNames from 'classnames';
import { composeRef } from 'rc-util/lib/ref';
import * as React from 'react';
import type { SearchProps } from './Search';
import type { InputRef } from './Input';
import Input from './Input';
import { ConfigContext } from '../config-provider';
import SizeContext from '../config-provider/SizeContext';
import { useCompactItemContext } from '../space/Compact';
import LoadingIcon from '../button/LoadingIcon';

export interface SearchInputProps extends Omit<SearchProps, 'enterButton' | 'suffix'> {}

const SearchInput = React.forwardRef<InputRef, SearchInputProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    inputPrefixCls: customizeInputPrefixCls,
    className,
    size: customizeSize,
    addonAfter,
    loading,
    disabled,
    onSearch: customOnSearch,
    onChange: customOnChange,
    onCompositionStart,
    onCompositionEnd,
    allowClear,
    ...restProps
  } = props;
  const [hasValue, setHasValue] = React.useState<boolean>(false);

  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const contextSize = React.useContext(SizeContext);
  const composedRef = React.useRef<boolean>(false);

  const prefixCls = getPrefixCls('input-search', customizePrefixCls);
  const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
  const { compactSize } = useCompactItemContext(prefixCls, direction);

  const size = compactSize || customizeSize || contextSize;

  const inputRef = React.useRef<InputRef>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target && e.type === 'click' && customOnSearch) {
      customOnSearch((e as React.ChangeEvent<HTMLInputElement>).target.value, e);
    }
    setHasValue(!!(e && e.target && e.target.value));
    if (customOnChange) {
      customOnChange(e);
    }
  };

  const onMouseDown: React.MouseEventHandler<HTMLElement> = (e) => {
    if (document.activeElement === inputRef.current?.input) {
      e.preventDefault();
    }
  };

  const onSearch = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (customOnSearch) {
      customOnSearch(inputRef.current?.input?.value!, e);
    }
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (composedRef.current || loading) {
      return;
    }
    onSearch(e);
  };

  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-${size}`]: !!size,
    },
    className,
  );

  const handleOnCompositionStart: React.CompositionEventHandler<HTMLInputElement> = (e) => {
    composedRef.current = true;
    onCompositionStart?.(e);
  };

  const handleOnCompositionEnd: React.CompositionEventHandler<HTMLInputElement> = (e) => {
    composedRef.current = false;
    onCompositionEnd?.(e);
  };

  const searchBtn = loading ? (
    <LoadingIcon existIcon={true} prefixCls={prefixCls} loading={loading} />
  ) : (
    <SearchOutlined
      className={classNames(`${prefixCls}-suffix-icon`, {
        [`${prefixCls}-suffix-icon-disabled`]: disabled,
      })}
      onClick={onSearch}
      onMouseDown={onMouseDown}
    />
  );

  const suffix = allowClear && hasValue ? null : searchBtn;
  const _allowClear = hasValue ? allowClear : false;

  return (
    <Input
      ref={composeRef<InputRef>(inputRef, ref)}
      onPressEnter={onPressEnter}
      {...restProps}
      size={size}
      onCompositionStart={handleOnCompositionStart}
      onCompositionEnd={handleOnCompositionEnd}
      prefixCls={inputPrefixCls}
      addonAfter={null}
      suffix={suffix}
      onChange={onChange}
      className={cls}
      disabled={disabled}
      allowClear={_allowClear}
    />
  );
});

if (process.env.NODE_ENV !== 'production') {
  SearchInput.displayName = 'SearchInput';
}

export default SearchInput;
