import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS = deepAssign({}, Plot.getDefaultOptions(), {
  layout: 'horizontal',
  size: {
    range: 30,
    measure: 20,
    target: 20,
  },
  xAxis: {
    tickLine: false,
    line: null,
  },
  bulletStyle: {
    range: {
      fillOpacity: 0.5,
    },
  },
  label: {
    measure: {
      position: 'right',
    },
  },
  tooltip: {
    // 默认关闭
    showMarkers: false,
  },
});
