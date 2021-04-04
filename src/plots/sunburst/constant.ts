import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';

/**
 * 旭日图 默认配置项
 */
export const DEFAULT_OPTIONS = deepAssign({}, Plot.getDefaultOptions(), {
  type: 'partition',
  innerRadius: 0,
  seriesField: 'value',
  tooltip: {
    shared: true,
    showMarkers: false,
    offset: 20,
    showTitle: false,
  },
});
