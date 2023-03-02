import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import cssVariables from '../../theme/cssVariables';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

interface EmptyToken extends FullToken<'Empty'> {
  emptyImgCls: string;
  emptyImgHeight: number;
  emptyImgHeightSM: number;
  emptyImgHeightMD: number;
}

// ============================== Shared ==============================
const genSharedEmptyStyle: GenerateStyle<EmptyToken> = (token): CSSObject => {
  const { componentCls, margin, marginXS, marginXL, fontSize, lineHeight } = token;

  return {
    [componentCls]: {
      marginInline: marginXS,
      fontSize,
      lineHeight,
      textAlign: 'center',

      // 原来 &-image 没有父子结构，现在为了外层承担我们的hashId，改成父子结果
      [`${componentCls}-image`]: {
        height: token.emptyImgHeight,
        marginBottom: marginXS,
        opacity: token.opacityImage,
        fontSize: 40,

        img: {
          height: '100%',
        },

        svg: {
          height: '100%',
          margin: 'auto',
        },
      },

      [`${componentCls}-description`]: {
        color: cssVariables.WjE3,
      },

      // 原来 &-footer 没有父子结构，现在为了外层承担我们的hashId，改成父子结果
      [`${componentCls}-footer`]: {
        marginTop: margin,
      },

      '&-normal': {
        marginBlock: marginXL,
        color: cssVariables.WjE3,

        [`${componentCls}-description`]: {
          color: cssVariables.WjE3,
        },

        [`${componentCls}-image`]: {
          height: token.emptyImgHeightMD,
        },
      },

      '&-small': {
        marginBlock: marginXS,
        color: cssVariables.WjE3,

        [`${componentCls}-image`]: {
          height: token.emptyImgHeightSM,
        },
      },
      '&-infoEmpty': {
        display: 'flex',
        justifyContent: 'center',
        lineHeight: '16px',

        [`${componentCls}-image`]: {
          lineHeight: '16px',
          height: '16px',
          marginInlineEnd: '10px',
          fontSize: '16px',
        },
        '.anticon-info': {
          fontSize: 16,
        },
        [`${componentCls}-description`]: {
          color: cssVariables.WjE3,
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Empty', (token) => {
  const { componentCls, controlHeightLG } = token;

  const emptyToken: EmptyToken = mergeToken<EmptyToken>(token, {
    emptyImgCls: `${componentCls}-img`,
    emptyImgHeight: controlHeightLG * 2.5,
    emptyImgHeightMD: controlHeightLG,
    emptyImgHeightSM: controlHeightLG * 0.875,
  });

  return [genSharedEmptyStyle(emptyToken)];
});
