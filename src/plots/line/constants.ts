import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';

/**
 * 折线图默认配置项
 */
export const DEFAULT_OPTIONS = deepAssign({}, Plot.getDefaultOptions(), {
  tooltip: {
    shared: true,
    showMarkers: true,
    showCrosshairs: true,
    crosshairs: {
      type: 'x',
    },
  },
  legend: {
    position: 'top-left',
    radio: {},
  },
  isStack: false,
});
