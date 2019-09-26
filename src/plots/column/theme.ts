import { defaultTheme } from '../../theme';

const COLUMN_ACTIVE_STYLE = (style) => {
  const opacity = style.opacity || 1;
  return { opacity: opacity * 0.5 };
};

const COLUMN_DISABLE_STYLE = (style) => {
  const opacity = style.opacity || 1;
  return { opacity: opacity * 0.5, fillOpacity: opacity * 0.5 };
};

defaultTheme.registerPlotTheme('column', {
  columnStyle: {
    normal: {},
    active: COLUMN_ACTIVE_STYLE,
    disable: COLUMN_DISABLE_STYLE,
    selected: { lineWidth: 1, stroke: 'black' },
  },
});
