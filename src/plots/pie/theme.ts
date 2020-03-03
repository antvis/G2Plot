import { registerTheme } from '../../theme';

const PIE_ACTIVE_STYLE = (style) => {
  const opacity = style.opacity || 1;
  return { fillOpacity: opacity * 0.8 };
};

const PIE_DISABLE_STYLE = (style) => {
  const opacity = style.opacity || 1;
  return { fillOpacity: opacity * 0.5 };
};

registerTheme('pie', {
  columnStyle: {
    normal: {},
    active: PIE_ACTIVE_STYLE,
    disable: PIE_DISABLE_STYLE,
    selected: { lineWidth: 1, stroke: 'black' },
  },
});
