import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';

/**
 * 玉珏图 默认配置项
 */
export const DEFAULT_OPTIONS = deepAssign({}, Plot.getDefaultOptions(), {
  interactions: [{ type: 'element-active' }],
  legend: false,
  tooltip: {
    showMarkers: false,
  },
  xAxis: {
    grid: null,
    tickLine: null,
    line: null,
  },
  maxAngle: 240,
});
