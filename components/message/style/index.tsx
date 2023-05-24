// deps-lint-skip-all
import { Keyframes } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import { resetComponent } from '../../style';
import { baseColor } from '../../theme/cssVariables';
import { getAlphaColor } from '../../theme/themes/dark/colorAlgorithm';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
  height: number;
  zIndexPopup: number;
}

interface MessageToken extends FullToken<'Message'> {
  // Custom token here
  messageNoticeContentPadding: string;
  messageIconMargin: number;
  bgColorInfo: string;
  bgColorSuccess: string;
  bgColorError: string;
  bgColorWarning: string;
}

const genMessageStyle: GenerateStyle<MessageToken> = (token) => {
  const {
    componentCls,
    iconCls,
    boxShadow,
    colorBgElevated,
    colorBgBase,
    fontSizeXL,
    motionEaseInOutCirc,
    motionDurationSlow,
    marginXS,
    paddingXS,
    borderRadiusLG,
    zIndexPopup,
    // Custom token
    messageNoticeContentPadding,
    messageIconMargin,
    bgColorInfo,
    bgColorSuccess,
    bgColorError,
    bgColorWarning,
  } = token;

  const messageMoveIn = new Keyframes('MessageMoveIn', {
    '0%': {
      padding: 0,
      transform: 'translateY(-100%)',
      opacity: 0,
    },

    '100%': {
      padding: paddingXS,
      transform: 'translateY(0)',
      opacity: 1,
    },
  });

  const messageMoveOut = new Keyframes('MessageMoveOut', {
    '0%': {
      maxHeight: token.height,
      padding: paddingXS,
      opacity: 1,
    },
    '100%': {
      maxHeight: 0,
      padding: 0,
      opacity: 0,
    },
  });

  return [
    // ============================ Holder ============================
    {
      [componentCls]: {
        ...resetComponent(token),
        position: 'fixed',
        top: marginXS,
        width: '100%',
        pointerEvents: 'none',
        zIndex: zIndexPopup,

        [`${componentCls}-move-up`]: {
          animationFillMode: 'forwards',
        },
        [`
        ${componentCls}-move-up-appear,
        ${componentCls}-move-up-enter
      `]: {
          animationName: messageMoveIn,
          animationDuration: motionDurationSlow,
          animationPlayState: 'paused',
          animationTimingFunction: motionEaseInOutCirc,
        },
        [`
        ${componentCls}-move-up-appear${componentCls}-move-up-appear-active,
        ${componentCls}-move-up-enter${componentCls}-move-up-enter-active
      `]: {
          animationPlayState: 'running',
        },
        [`${componentCls}-move-up-leave`]: {
          animationName: messageMoveOut,
          animationDuration: motionDurationSlow,
          animationPlayState: 'paused',
          animationTimingFunction: motionEaseInOutCirc,
        },
        [`${componentCls}-move-up-leave${componentCls}-move-up-leave-active`]: {
          animationPlayState: 'running',
        },
        '&-rtl': {
          direction: 'rtl',
          span: {
            direction: 'rtl',
          },
        },
      },
    },

    // ============================ Notice ============================
    {
      [`${componentCls}-notice`]: {
        padding: paddingXS,
        textAlign: 'center',

        [`${componentCls}-custom-content`]: {
          lineHeight: `${fontSizeXL}px`,
          display: 'flex',

          [`& > ${iconCls}`]: {
            verticalAlign: 'text-bottom',
            marginInlineEnd: messageIconMargin, // affected by ltr or rtl
            fontSize: fontSizeXL,
          },
        },

        [`${componentCls}-notice-content`]: {
          display: 'inline-block',
          padding: messageNoticeContentPadding,
          background: colorBgElevated,
          borderRadius: borderRadiusLG,
          boxShadow,
          pointerEvents: 'all',
          color: colorBgBase,
        },

        [`
        &-info > ${componentCls}-notice-content,
        &-loading > ${componentCls}-notice-content`]: {
          background: bgColorInfo,
        },

        [`&-success > ${componentCls}-notice-content`]: {
          background: bgColorSuccess,
        },

        [`&-error > ${componentCls}-notice-content`]: {
          background: bgColorError,
        },

        [`&-warning > ${componentCls}-notice-content`]: {
          background: bgColorWarning,
        },
      },
    },

    // ============================= Pure =============================
    {
      [`${componentCls}-notice-pure-panel`]: {
        padding: 0,
        textAlign: 'start',
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Message',
  (token) => {
    // Gen-style functions here
    const combinedToken = mergeToken<MessageToken>(token, {
      messageNoticeContentPadding: '16px 30px',
      messageIconMargin: 10,
      bgColorInfo: getAlphaColor(baseColor['--wj-E4_1'], 0.95),
      bgColorSuccess: getAlphaColor(baseColor['--wj-E3_1'], 0.95),
      bgColorError: getAlphaColor(baseColor['--wj-A3_1'], 0.95),
      bgColorWarning: getAlphaColor(baseColor['--wj-E2_1'], 0.95),
      boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.20)',
    });
    return [genMessageStyle(combinedToken)];
  },
  (token) => ({
    height: 150,
    zIndexPopup: token.zIndexPopupBase + 10,
  }),
);
