import { registerTheme } from '../../theme';

const BAR_ACTIVE_STYLE = (style) => {
  const opacity = style.opacity || 1;
  return { opacity: opacity * 0.5 };
};

const BAR_DISABLE_STYLE = (style) => {
  const opacity = style.opacity || 1;
  return { opacity: opacity * 0.5 };
};

registerTheme('funnel', {
  columnStyle: {
    normal: {},
    active: BAR_ACTIVE_STYLE,
    disable: BAR_DISABLE_STYLE,
    selected: { lineWidth: 1, stroke: 'black' },
  },
});
