import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';

/**
 * 柱形图默认配置项
 */
export const DEFAULT_OPTIONS = deepAssign({}, Plot.getDefaultOptions(), {
  columnWidthRatio: 0.6,
  marginRatio: 1 / 32,
  tooltip: {
    shared: true,
    showMarkers: false,
    offset: 20,
  },
  interactions: [{ type: 'active-region' }],
});
