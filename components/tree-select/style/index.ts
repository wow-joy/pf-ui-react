import cssVariables from '../../theme/cssVariables';
import { getStyle as getCheckboxStyle } from '../../checkbox/style';
import type { AliasToken, FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import { genTreeStyle } from '../../tree/style';

interface TreeSelectToken extends FullToken<'TreeSelect'> {
  treePrefixCls: string;
}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<TreeSelectToken> = (token) => {
  const { componentCls, treePrefixCls, colorBgElevated } = token;
  const treeCls = `.${treePrefixCls}`;

  return [
    // ======================================================
    // ==                     Dropdown                     ==
    // ======================================================
    {
      [`${componentCls}-dropdown`]: [
        // ====================== Tree ======================
        genTreeStyle(
          treePrefixCls,
          mergeToken<AliasToken>(token, {
            colorBgContainer: colorBgElevated,
            colorText: cssVariables.WjE2,
          }),
        ),
        {
          [treeCls]: {
            borderRadius: 0,
            '&-list-holder-inner': {
              alignItems: 'stretch',

              [`${treeCls}-treenode`]: {
                width: '100%',
                [`${treeCls}-node-content-wrapper`]: {
                  flex: 'auto',
                },
              },
            },
          },
        },

        // ==================== Checkbox ====================
        getCheckboxStyle(`${treePrefixCls}-checkbox`, token),

        // ====================== RTL =======================
        {
          '&-rtl': {
            direction: 'rtl',

            [`${treeCls}-switcher${treeCls}-switcher_close`]: {
              [`${treeCls}-switcher-icon svg`]: {
                transform: 'rotate(90deg)',
              },
            },
          },
        },
      ],
    },
  ];
};

// ============================== Export ==============================
export default function useTreeSelectStyle(prefixCls: string, treePrefixCls: string) {
  return genComponentStyleHook('TreeSelect', (token) => {
    const treeSelectToken = mergeToken<TreeSelectToken>(token, {
      treePrefixCls,
    });
    return [genBaseStyle(treeSelectToken)];
  })(prefixCls);
}
