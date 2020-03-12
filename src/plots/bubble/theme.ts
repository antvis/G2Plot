import { registerTheme } from '../../theme';

const POINT_ACTIVE_STYLE = (style) => {
  const stroke = style.stroke || '#000';
  const fillOpacity = style.fillOpacity || style.opacity || 0.95;
  return {
    stroke,
    fillOpacity,
  };
};

const POINT_SELECTED_STYLE = (style) => {
  const stroke = style.stroke || '#000';
  const lineWidth = style.lineWidth || 2;
  return {
    stroke,
    lineWidth,
  };
};

const POINT_INACTIVE_STYLE = (style) => {
  const fillOpacity = style.fillOpacity || style.opacity || 0.3;
  return {
    fillOpacity,
  };
};

registerTheme('bubble', {
  pointStyle: {
    normal: {},
    active: POINT_ACTIVE_STYLE,
    selected: POINT_SELECTED_STYLE,
    inactive: POINT_INACTIVE_STYLE,
  },
});
