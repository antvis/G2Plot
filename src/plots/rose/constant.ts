import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';

/**
 * 玫瑰图 默认配置项
 */
export const DEFAULT_OPTIONS = deepAssign({}, Plot.getDefaultOptions(), {
  xAxis: false,
  yAxis: false,
  legend: {
    position: 'right',
    offsetX: -10,
  },
  sectorStyle: {
    stroke: '#fff',
    lineWidth: 1,
  },
  label: {
    layout: {
      type: 'limit-in-shape',
    },
  },
  tooltip: {
    shared: true,
    showMarkers: false,
  },
  interactions: [{ type: 'active-region' }],
});
