import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';

/** point 标注点视图 */
export const POINT_VIEW_ID = 'point-view';

/**
 * 折线图默认配置项
 */
export const DEFAULT_OPTIONS = deepAssign({}, Plot.getDefaultOptions(), {
  syncViewPadding: true,
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
  },
  isStack: false,
});
