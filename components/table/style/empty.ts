import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../theme/internal';
import type { TableToken } from './index';
import cssVariables from '../../theme/cssVariables';
// ========================= Placeholder ==========================
const genEmptyStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const { componentCls, antCls } = token;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-tbody > tr${componentCls}-placeholder`]: {
        textAlign: 'center',
        color: token.colorTextDisabled,

        '&:hover > td': {
          background: token.colorBgContainer,
        },
        '.anticon-no-data, .anticon-no-result': {
          'font-size': '120px',
        },
        [`${antCls}-empty-description`]: {
          color: cssVariables.WjE3,
        },
        [`${antCls}-empty-image`]: {
          height: 118,
        },
      },
    },
  };
};

export default genEmptyStyle;
