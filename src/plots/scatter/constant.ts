import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';

/**
 * 散点图 默认配置项
 */
export const DEFAULT_OPTIONS = deepAssign({}, Plot.getDefaultOptions(), {
  size: 4,
  tooltip: {
    showTitle: false,
    showMarkers: false,
    showCrosshairs: true,
    crosshairs: {
      type: 'xy',
    },
  },
});
