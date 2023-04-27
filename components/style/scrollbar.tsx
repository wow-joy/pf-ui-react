import type { FullToken } from '../theme/internal';
import cssVariables from '../theme/cssVariables';

export interface ScrollbarToken extends FullToken<'Scrollbar'> {
  scrollbarWidth: number;
  trackBgColor: string;
  borderColor: string;
  thumbBgColor: string;
  hoverColor: string;
}

export const defaultScrollbarToken = {
  scrollbarWidth: 12,
  trackBgColor: cssVariables.WjC16,
  borderColor: cssVariables.borderColor,
  thumbBgColor: cssVariables.WjC8,
  hoverColor: cssVariables.WjE3,
  borderRadius: 3,
};

export const getWebkitScrollbarStyle = (_token?: ScrollbarToken) => {
  const token = {
    ...defaultScrollbarToken,
    ..._token,
  };

  return {
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

      '&:hover': {
        background: token.hoverColor,
      },
    },

    '&::-webkit-scrollbar-corner': {
      backgroundColor: token.trackBgColor,
      boxShadow: `0px 1px 0px 0px ${token.borderColor} inset, 0px -1px 0px 0px ${token.borderColor} inset`,
    },

    '&::-webkit-scrollbar': {
      width: token.scrollbarWidth,
      height: token.scrollbarWidth,
    },
  };
};
