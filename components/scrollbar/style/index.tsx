import type { GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook } from '../../theme/internal';
import { resetComponent } from '../../style';
import { getWebkitScrollbarStyle } from '../../style/scrollbar';
import type { ScrollbarToken } from '../../style/scrollbar';

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
export default genComponentStyleHook('Scrollbar', (token) => [
  genScrollbarStyle(token as ScrollbarToken),
]);
