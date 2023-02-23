import type React from 'react';
import { initFadeMotion, initZoomMotion } from '../../style/motion';
import type { AliasToken, FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import type { TokenWithCommonCls } from '../../theme/util/genComponentStyleHook';
import { clearFix, genFocusStyle, resetComponent } from '../../style';
import cssVariables from '../../theme/cssVariables';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

export interface ModalToken extends FullToken<'Modal'> {
  // Custom token here
  modalBodyPadding: string;
  modalHeaderBg: string;
  modalHeaderPaddingVertical: number;
  modalHeaderPaddingHorizontal: number;
  modalHeaderBorderWidth: number;
  modalHeaderBorderStyle: string;
  modalHeaderTitleLineHeight: number;
  modalHeaderTitleFontSize: number;
  modalHeaderBorderColorSplit: string;
  modalHeaderCloseSize: number;
  modalContentBg: string;
  modalHeadingColor: string;
  modalCloseColor: string;
  modalCloseBtnSize: number;
  modalFooterBg: string;
  modalFooterBorderColorSplit: string;
  modalFooterBorderStyle: string;
  modalFooterPaddingVertical: number;
  modalFooterPaddingHorizontal: number;
  modalFooterBorderWidth: number;
  modalConfirmTitleFontSize: number;
  modalIconHoverColor: string;
  modalConfirmIconSize: number;
  modalBorderRadius: number;
  headerBgTextColor: string;
  modalHeaderBgIconHoverColor: string;
  modalConfirmBodyPadding: string;
  modalConfirmIconMarginHorizontal: number;
  modalConfirmContentColor: string;
  modalConfirmContentMarginTop: number;
  modalConfirmBtnsMarginTop: number;
  modalConfirmCloseIconSize: number;
  modalconfirmCloseColor: string;
}

function box(position: React.CSSProperties['position']): React.CSSProperties {
  return {
    position,
    top: 0,
    insetInlineEnd: 0,
    bottom: 0,
    insetInlineStart: 0,
  };
}

export const genModalMaskStyle: GenerateStyle<TokenWithCommonCls<AliasToken>> = (token) => {
  const { componentCls } = token;

  return [
    {
      [`${componentCls}-root`]: {
        [`${componentCls}${token.antCls}-zoom-enter, ${componentCls}${token.antCls}-zoom-appear`]: {
          // reset scale avoid mousePosition bug
          transform: 'none',
          opacity: 0,
          animationDuration: token.motionDurationSlow,
          // https://github.com/ant-design/ant-design/issues/11777
          userSelect: 'none',
        },

        [`${componentCls}-mask`]: {
          ...box('fixed'),
          zIndex: token.zIndexPopupBase,
          height: '100%',
          backgroundColor: token.colorBgMask,

          [`${componentCls}-hidden`]: {
            display: 'none',
          },
        },

        [`${componentCls}-wrap`]: {
          ...box('fixed'),
          overflow: 'auto',
          outline: 0,
          WebkitOverflowScrolling: 'touch',
        },
      },
    },
    { [`${componentCls}-root`]: initFadeMotion(token) },
  ];
};

const genModalStyle: GenerateStyle<ModalToken> = (token) => {
  const { componentCls } = token;

  return [
    // ======================== Root =========================
    {
      [`${componentCls}-root`]: {
        [`${componentCls}-wrap`]: {
          zIndex: token.zIndexPopupBase,
          position: 'fixed',
          inset: 0,
          overflow: 'auto',
          outline: 0,
          WebkitOverflowScrolling: 'touch',
        },
        [`${componentCls}-wrap-rtl`]: {
          direction: 'rtl',
        },

        [`${componentCls}-centered`]: {
          textAlign: 'center',

          '&::before': {
            display: 'inline-block',
            width: 0,
            height: '100%',
            verticalAlign: 'middle',
            content: '""',
          },
          [componentCls]: {
            top: 0,
            display: 'inline-block',
            paddingBottom: 0,
            textAlign: 'start',
            verticalAlign: 'middle',
          },
        },

        [`@media (max-width: ${token.screenSMMax})`]: {
          [componentCls]: {
            maxWidth: 'calc(100vw - 16px)',
            margin: `${token.marginXS} auto`,
          },
          [`${componentCls}-centered`]: {
            [componentCls]: {
              flex: 1,
            },
          },
        },
      },
    },

    // ======================== Modal ========================
    {
      [componentCls]: {
        ...resetComponent(token),
        pointerEvents: 'none',
        position: 'relative',
        top: 100,
        width: 'auto',
        maxWidth: `calc(100vw - ${token.margin * 2}px)`,
        margin: '0 auto',
        paddingBottom: token.paddingLG,

        [`${componentCls}-title`]: {
          margin: 0,
          color: token.modalHeadingColor,
          fontWeight: token.fontWeightStrong,
          fontSize: token.modalHeaderTitleFontSize,
          lineHeight: token.modalHeaderTitleLineHeight,
          wordWrap: 'break-word',
          padding: `${token.modalHeaderPaddingVertical}px ${token.modalHeaderPaddingHorizontal}px`,
        },

        [`${componentCls}-content`]: {
          position: 'relative',
          backgroundColor: token.modalContentBg,
          backgroundClip: 'padding-box',
          border: 0,
          borderRadius: token.modalBorderRadius,
          boxShadow: token.boxShadow,
          pointerEvents: 'auto',
          padding: 0,
        },

        [`${componentCls}-close`]: {
          position: 'absolute',
          top: token.modalHeaderPaddingVertical,
          insetInlineEnd: token.modalHeaderCloseSize + 2,
          zIndex: token.zIndexPopupBase + 10,
          padding: 0,
          color: token.modalCloseColor,
          fontWeight: token.fontWeightStrong,
          lineHeight: 1,
          textDecoration: 'none',
          background: 'transparent',
          borderRadius: token.borderRadiusSM,
          width: token.modalHeaderCloseSize,
          height: token.modalHeaderCloseSize,
          border: 0,
          outline: 0,
          cursor: 'pointer',
          transition: `color ${token.motionDurationMid}, background-color ${token.motionDurationMid}`,
          fontSize: token.modalHeaderCloseSize,

          '&-x': {
            display: 'block',
            fontSize: token.modalHeaderCloseSize,
            fontStyle: 'normal',
            lineHeight: `${token.modalHeaderCloseSize}px`,
            textAlign: 'center',
            textTransform: 'none',
            textRendering: 'auto',
          },

          '&:hover': {
            color: token.modalIconHoverColor,
            // backgroundColor: token.wireframe ? 'transparent' : token.colorFillContent,
            textDecoration: 'none',
          },

          // '&:active': {
          //   backgroundColor: token.wireframe ? 'transparent' : token.colorFillContentHover,
          // },

          ...genFocusStyle(token),
        },

        [`${componentCls}-header`]: {
          color: token.modalHeadingColor,
          background: token.modalHeaderBg,
          borderRadius: `${token.modalBorderRadius}px ${token.modalBorderRadius}px 0 0`,
          position: 'relative',

          '&::after': {
            content: '""',
            position: 'absolute',
            height: token.lineWidth,
            bottom: 0,
            insetInlineEnd: token.modalHeaderPaddingHorizontal,
            insetInlineStart: token.modalHeaderPaddingHorizontal,
            backgroundColor: '#ebebeb',
          },
        },

        [`${componentCls}-body`]: {
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          wordWrap: 'break-word',
          padding: token.modalBodyPadding,
        },

        [`${componentCls}-footer`]: {
          textAlign: 'center',
          background: token.modalFooterBg,
          paddingBottom: token.paddingLG,

          [`${token.antCls}-btn + ${token.antCls}-btn:not(${token.antCls}-dropdown-trigger)`]: {
            marginBottom: 0,
            marginInlineStart: token.marginXS,
          },
        },

        [`${componentCls}-open`]: {
          overflow: 'hidden',
        },
      },
      [`${componentCls}-header-bg`]: {
        [`${componentCls}-header`]: {
          backgroundColor: token.colorPrimary,
          color: token.headerBgTextColor,

          '&::after': {
            display: 'none',
          },
        },

        [`${componentCls}-title`]: {
          color: token.headerBgTextColor,
        },

        [`${componentCls}-close`]: {
          color: token.headerBgTextColor,

          '&:hover': {
            color: token.modalHeaderBgIconHoverColor,
          },
        },
      },
    },

    // ======================== Pure =========================
    {
      [`${componentCls}-pure-panel`]: {
        top: 'auto',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',

        [`${componentCls}-content,
          ${componentCls}-body,
          ${componentCls}-confirm-body-wrapper`]: {
          display: 'flex',
          flexDirection: 'column',
          flex: 'auto',
        },

        [`${componentCls}-confirm-body`]: {
          marginBottom: 'auto',
        },
      },
    },
  ];
};

const genModalConfirmStyle: GenerateStyle<ModalToken> = (token) => {
  const { componentCls } = token;
  const confirmComponentCls = `${componentCls}-confirm`;

  return {
    [confirmComponentCls]: {
      [`${componentCls}-body`]: {
        padding: token.modalConfirmBodyPadding,
      },

      '&-rtl': {
        direction: 'rtl',
      },
      [`${token.antCls}-modal-header`]: {
        display: 'none',
      },
      [`${confirmComponentCls}-body-wrapper`]: {
        ...clearFix(),
      },
      [`${confirmComponentCls}-body`]: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',

        [`${confirmComponentCls}-title`]: {
          flex: '0 0 100%',
          display: 'block',
          // create BFC to avoid
          // https://user-images.githubusercontent.com/507615/37702510-ba844e06-2d2d-11e8-9b67-8e19be57f445.png
          overflow: 'hidden',
          color: token.modalHeadingColor,
          fontWeight: token.fontWeightStrong,
          fontSize: token.modalHeaderTitleFontSize,
          lineHeight: token.lineHeight,

          [`+ ${confirmComponentCls}-content`]: {
            marginBlockStart:
              token.modalConfirmContentMarginTop -
              ((token.lineHeight - 1) * token.modalHeaderTitleFontSize) / 2 -
              ((token.lineHeight - 1) * token.fontSizeSM) / 2,
            flexBasis: '100%',
            maxWidth: `calc(100% - ${
              token.modalConfirmIconSize + token.modalConfirmIconMarginHorizontal
            }px)`,
          },
        },

        [`${confirmComponentCls}-content`]: {
          color: token.modalConfirmContentColor,
          fontSize: token.fontSizeSM,
        },

        [`> ${token.iconCls}`]: {
          flex: 'none',
          marginInlineEnd: token.modalConfirmIconMarginHorizontal,
          fontSize: token.modalConfirmIconSize,

          [`+ ${confirmComponentCls}-title`]: {
            flex: 1,
          },

          // `content` after `icon` should set marginLeft
          [`+ ${confirmComponentCls}-title + ${confirmComponentCls}-content`]: {
            marginInlineStart: token.modalConfirmIconSize + token.modalConfirmIconMarginHorizontal,
          },
        },
      },
      [`${confirmComponentCls}-btns`]: {
        textAlign: 'center',
        marginTop:
          token.modalConfirmBtnsMarginTop - ((token.lineHeight - 1) * token.fontSizeSM) / 2,

        [`${token.antCls}-btn + ${token.antCls}-btn`]: {
          marginBottom: 0,
          marginInlineStart: token.marginXS,
        },
      },

      [`${componentCls}-close`]: {
        top: token.modalConfirmCloseIconSize,
        insetInlineEnd: token.modalConfirmCloseIconSize,
        fontSize: token.modalConfirmCloseIconSize,
        color: token.modalconfirmCloseColor,

        [`${confirmComponentCls}-close-x`]: {
          fontSize: token.modalConfirmCloseIconSize,
        },
      },
    },

    [`${confirmComponentCls}-error ${confirmComponentCls}-body > ${token.iconCls}`]: {
      color: token.colorError,
    },

    [`${confirmComponentCls}-warning ${confirmComponentCls}-body > ${token.iconCls},
        ${confirmComponentCls}-confirm ${confirmComponentCls}-body > ${token.iconCls}`]: {
      color: token.colorWarning,
    },

    [`${confirmComponentCls}-info ${confirmComponentCls}-body > ${token.iconCls}`]: {
      color: token.colorInfo,
    },

    [`${confirmComponentCls}-success ${confirmComponentCls}-body > ${token.iconCls}`]: {
      color: token.colorSuccess,
    },

    // https://github.com/ant-design/ant-design/issues/37329
    [`${componentCls}-zoom-leave ${componentCls}-btns`]: {
      pointerEvents: 'none',
    },
  };
};

const genRTLStyle: GenerateStyle<ModalToken> = (token) => {
  const { componentCls } = token;
  return {
    [`${componentCls}-root`]: {
      [`${componentCls}-wrap-rtl`]: {
        direction: 'rtl',

        [`${componentCls}-confirm-body`]: {
          direction: 'rtl',
        },
      },
    },
  };
};

// const genWireframeStyle: GenerateStyle<ModalToken> = (token) => {
//   const { componentCls, antCls } = token;
//   const confirmComponentCls = `${componentCls}-confirm`;

//   return {
//     [componentCls]: {
//       [`${componentCls}-content`]: {
//         padding: 0,
//       },

//       [`${componentCls}-header`]: {
//         padding: token.modalHeaderPadding,
//         borderBottom: `${token.modalHeaderBorderWidth}px ${token.modalHeaderBorderStyle} ${token.modalHeaderBorderColorSplit}`,
//         marginBottom: 0,
//       },

//       [`${componentCls}-body`]: {
//         padding: token.modalBodyPadding,
//       },

//       [`${componentCls}-footer`]: {
//         padding: `${token.modalFooterPaddingVertical}px ${token.modalFooterPaddingHorizontal}px`,
//         borderTop: `${token.modalFooterBorderWidth}px ${token.modalFooterBorderStyle} ${token.modalFooterBorderColorSplit}`,
//         borderRadius: `0 0 ${token.borderRadiusLG}px ${token.borderRadiusLG}px`,
//         marginTop: 0,
//       },
//     },

//     [confirmComponentCls]: {
//       [`${antCls}-modal-body`]: {
//         padding: `${token.padding * 2}px ${token.padding * 2}px ${token.paddingLG}px`,
//       },
//       [`${confirmComponentCls}-body`]: {
//         [`> ${token.iconCls}`]: {
//           marginInlineEnd: token.margin,

//           // `content` after `icon` should set marginLeft
//           [`+ ${confirmComponentCls}-title + ${confirmComponentCls}-content`]: {
//             marginInlineStart: token.modalConfirmIconSize + token.margin,
//           },
//         },
//       },
//       [`${confirmComponentCls}-btns`]: {
//         marginTop: token.marginLG,
//       },
//     },
//   };
// };

// ============================== Export ==============================
export default genComponentStyleHook('Modal', (token) => {
  const headerFontSize = token.fontSize;
  const headerLineHeight = 1;

  const modalToken = mergeToken<ModalToken>(token, {
    modalHeaderBg: token.colorBgElevated,
    modalHeaderPaddingVertical: token.paddingSM,
    modalHeaderPaddingHorizontal: 10,
    modalHeaderBorderWidth: token.lineWidth,
    modalHeaderBorderStyle: token.lineType,
    modalHeaderTitleLineHeight: headerLineHeight,
    modalHeaderTitleFontSize: headerFontSize,
    modalHeaderBorderColorSplit: token.colorSplit,
    modalHeaderCloseSize: headerFontSize,
    modalContentBg: token.colorBgElevated,
    modalHeadingColor: cssVariables.WjE1,
    modalCloseColor: cssVariables.WjE3,
    modalFooterBg: 'transparent',
    modalFooterBorderColorSplit: token.colorSplit,
    modalFooterBorderStyle: token.lineType,
    modalFooterPaddingVertical: token.paddingXS,
    modalFooterPaddingHorizontal: token.padding,
    modalFooterBorderWidth: token.lineWidth,
    modalConfirmTitleFontSize: token.fontSizeLG,
    modalIconHoverColor: token.colorIconHover,
    modalHeaderBgIconHoverColor: cssVariables.WjC9,
    modalConfirmIconSize: token.fontSizeXL,
    modalCloseBtnSize: token.controlHeightLG * 0.55,
    modalBorderRadius: 3,
    modalBodyPadding: `${token.paddingLG}px ${token.paddingMD}px`,
    colorPrimary: cssVariables.colorPrimary,
    headerBgTextColor: cssVariables.WjC1,
    modalConfirmBodyPadding: '24px 26px 18px',
    modalConfirmIconMarginHorizontal: 10,
    modalConfirmContentColor: cssVariables.WjE2,
    modalConfirmContentMarginTop: 10,
    modalConfirmBtnsMarginTop: 18,
    modalConfirmCloseIconSize: 10,
    modalconfirmCloseColor: cssVariables.WjE4,
  });
  return [
    genModalStyle(modalToken),
    genModalConfirmStyle(modalToken),
    genRTLStyle(modalToken),
    genModalMaskStyle(modalToken),
    // token.wireframe && genWireframeStyle(modalToken),
    initZoomMotion(modalToken, 'zoom'),
  ];
});
