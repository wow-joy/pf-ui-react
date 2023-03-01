import { TinyColor } from '@ctrl/tinycolor';
import * as React from 'react';
import NoResultTwoTone from '@pf-ui/pf-icons-react/NoResultTwoTone';
import { useToken } from '../theme/internal';

const Empty = () => {
  const [, token] = useToken();

  const bgColor = new TinyColor(token.colorBgBase);
  let themeStyle: React.CSSProperties = {};

  // Dark Theme need more dark of this
  if (bgColor.toHsl().l < 0.5) {
    themeStyle = {
      opacity: 0.65,
      fontSize: 100,
    };
  }

  return <NoResultTwoTone style={themeStyle} />;
};

if (process.env.NODE_ENV !== 'production') {
  Empty.displayName = 'EmptyImage';
}

export default Empty;
