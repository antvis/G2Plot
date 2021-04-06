import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';

export const BOX_RANGE = '$$range$$';
export const BOX_RANGE_ALIAS = 'low-q1-median-q3-high';

export const BOX_SYNC_NAME = '$$y_outliers$$';

export const OUTLIERS_VIEW_ID = 'outliers_view';

/**
 * 面积图默认配置项
 */
export const DEFAULT_OPTIONS = deepAssign({}, Plot.getDefaultOptions(), {
  meta: {
    [BOX_RANGE]: { min: 0, alias: BOX_RANGE_ALIAS },
  },

  // 默认区域交互
  interactions: [{ type: 'active-region' }],

  // 默认 tooltips 共享，不显示 markers
  tooltip: {
    showMarkers: false,
    showCrosshairs: true,
    shared: true,
  },
});
