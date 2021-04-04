import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS = deepAssign({}, Plot.getDefaultOptions(), {
  // @ts-ignore
  columnStyle: {
    stroke: '#FFFFFF',
  },
  tooltip: {
    shared: true,
    showMarkers: false,
  },
  interactions: [{ type: 'active-region' }],
});
