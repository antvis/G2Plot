import { registerTheme } from '../../theme';

const BULLET_ACTIVE_STYLE = (style) => {
  const opacity = style.opacity || 1;
  return { opacity: opacity * 0.5, lineWidth: 0 };
};

const BULLET_DISABLE_STYLE = (style) => {
  const opacity = style.opacity || 1;
  return { opacity: opacity * 0.5 };
};

registerTheme('bullet', {
  columnStyle: {
    normal: {},
    active: BULLET_ACTIVE_STYLE,
    disable: BULLET_DISABLE_STYLE,
    selected: {},
  },
});
