export const Y_FIELD = '$$stock-range$$';

export const TREND_FIELD = 'trend';
export const TREND_UP = 'up';
export const TREND_DOWN = 'down';

export const TREND_COLOR = ['#ef5350', '#26a69a'];

/** tooltip 配置 */
export const DEFAULT_TOOLTIP_OPTIONS = {
  showTitle: false,
  showMarkers: false,
  showCrosshairs: true,
  shared: true,
  crosshairs: {
    type: 'xy',
    follow: true,
  },
  itemTpl:
    '<li class="g2-tooltip-list-item" data-index={index}>' +
    '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
    '{name}{value}</li>',
};
