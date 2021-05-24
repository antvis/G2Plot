import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';

export const Y_FIELD = '$$stock-range$$';

export const TREND_FIELD = 'trend';
export const TREND_UP = 'up';
export const TREND_DOWN = 'down';

/** tooltip 配置 */
export const DEFAULT_TOOLTIP_OPTIONS = {
  showMarkers: false,
  showCrosshairs: true,
  shared: true,
  crosshairs: {
    type: 'xy',
    follow: true,
    text: (type, defaultContent, items) => {
      const tooltipCrosshairsText = { position: type === 'y' ? 'start' : 'end' };
      if (type === 'x') {
        const item = items[0];
        tooltipCrosshairsText['content'] = item ? item.title : defaultContent;
      } else {
        tooltipCrosshairsText['content'] = defaultContent;
      }
      return tooltipCrosshairsText;
    },
  },
};

/**
 * 散点图 默认配置项
 */
export const DEFAULT_OPTIONS = deepAssign({}, Plot.getDefaultOptions(), {
  // 设置默认图表 tooltips
  tooltip: DEFAULT_TOOLTIP_OPTIONS,
  interactions: [{ type: 'tooltip' }],
  legend: {
    position: 'top-left',
  },
  risingFill: '#ef5350',
  fallingFill: '#26a69a',
});
