import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';

/**
 * 色块图默认配置项
 */
export const DEFAULT_OPTIONS = deepAssign({}, Plot.getDefaultOptions(), {
  type: 'polygon',
  legend: false,
  coordinate: {
    type: 'rect',
  },
  xAxis: {
    tickLine: null,
    line: null,
    grid: {
      alignTick: false,
      line: {
        style: {
          lineWidth: 1,
          lineDash: null,
          stroke: '#f0f0f0',
        },
      },
    },
  },
  yAxis: {
    grid: {
      alignTick: false,
      line: {
        style: {
          lineWidth: 1,
          lineDash: null,
          stroke: '#f0f0f0',
        },
      },
    },
  },
});
