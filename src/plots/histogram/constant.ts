import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';

/** 直方图 xField */
export const HISTOGRAM_X_FIELD = 'range';
/** 直方图 yField */
export const HISTOGRAM_Y_FIELD = 'count';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS = deepAssign({}, Plot.getDefaultOptions(), {
  columnStyle: {
    stroke: '#FFFFFF',
  },
  tooltip: {
    shared: true,
    showMarkers: false,
  },
  interactions: [{ type: 'active-region' }],
});
