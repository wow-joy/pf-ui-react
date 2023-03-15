import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import { resetComponent } from '../../style';
import cssVariables from '../../theme/cssVariables';

interface ScrollbarToken extends FullToken<'Scrollbar'> {
  scrollbarWidth: number;
  trackBgColor: string;
  borderColor: string;
  thumbBgColor: string;
  hoverColor: string;
}

const getWebkitScrollbarStyle = (token: ScrollbarToken) => ({
  '&::-webkit-scrollbar-track': {
    borderRadius: 0,
    backgroundColor: token.trackBgColor,

    '&:vertical': {
      boxShadow: `1px 0px 0px 0px ${token.borderColor} inset, -1px 0px 0px 0px ${token.borderColor} inset`,
    },

    '&:horizontal': {
      boxShadow: `0px 1px 0px 0px ${token.borderColor} inset, 0px -1px 0px 0px ${token.borderColor} inset`,
    },
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: token.thumbBgColor,
    border: `3px solid transparent`,
    backgroundClip: 'padding-box',
    borderRadius: 2 * token.borderRadius,
  },

  '&::-webkit-scrollbar-corner': {
    backgroundColor: token.trackBgColor,
    boxShadow: `0px 1px 0px 0px ${token.borderColor} inset, 0px -1px 0px 0px ${token.borderColor} inset`,
  },

  '&::-webkit-scrollbar': {
    width: token.scrollbarWidth,
    height: token.scrollbarWidth,
  },

  '&::-webkit-scrollbar-thumb:hover': {
    background: token.hoverColor,
  },
});

const getScrollbarVisibility = (visibility: 'hidden' | 'visible') => ({
  '&::-webkit-scrollbar-track': {
    visibility,
  },
  '&::-webkit-scrollbar-thumb': {
    visibility,
  },
  '&::-webkit-scrollbar-corner': {
    visibility,
  },
});

const genScrollbarStyle: GenerateStyle<ScrollbarToken> = (token: ScrollbarToken) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),

      ...getWebkitScrollbarStyle(token),

      '&-rtl': {
        direction: 'rtl',
      },
    },

    [`${componentCls}-x-scroll`]: {
      overflowX: 'auto',
    },

    [`${componentCls}-y-scroll`]: {
      overflowY: 'auto',
    },

    [`${componentCls}-trigger-hover`]: {
      ...getScrollbarVisibility('hidden'),

      '&:hover': {
        ...getScrollbarVisibility('visible'),
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Scrollbar', (token) => {
  const scrollbarToken = mergeToken<ScrollbarToken>(token, {
    scrollbarWidth: 12,
    trackBgColor: cssVariables.WjC16,
    borderColor: cssVariables.borderColor,
    thumbBgColor: cssVariables.WjC8,
    hoverColor: cssVariables.WjE3,
  });

  return [genScrollbarStyle(scrollbarToken)];
});
