/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS = {
  autoFit: false,
  meta: {},
  xAxis: {},
  yAxis: {},
  tooltip: {
    follow: true,
    offset: 20,
    showTitle: true,
    showContent: true,
    showCrosshairs: true,
    showMarkers: true,
    crosshairs: {
      type: 'x',
      text: false,
      line: {
        style: {
          stroke: '#999',
          lineWidth: 0.5,
        },
      },
    },
  },
  brushZoom: {
    type: 'xy',
  },
};
