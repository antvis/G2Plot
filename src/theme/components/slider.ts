import { COLOR_PALETTE } from '../color';

const background_style = {
  fill: '#416180',
  opacity: 0.05,
};

const foreground_style = {
  fill: '#5B8FF9',
  opacity: 0.15,
  cursor: 'move',
};

const trend_line_style = {
  stroke: '#C5C5C5',
  strokeOpacity: 0.85,
};

const trend_area_style = {
  fill: '#CACED4',
  opacity: 0.85,
};

export const slider = {
  x: null,
  y: null,
  width: null,
  height: null,
  trend: {
    visible: true,
    smooth: false,
    isArea: false,
    backgroundStyle: background_style,
    lineStyle: trend_line_style,
    areaStyle: trend_area_style,
  },
  backgroundStyle: background_style,
  foregroundStyle: foreground_style,
  handlerStyle: {
    width: 10,
    height: 14,
    fill: COLOR_PALETTE.greyScale['0.4'],
  },
  textStyle: {
    textBaseline: 'middle',
    fill: COLOR_PALETTE.greyScale['1'],
    opacity: 0.45,
  },
};
