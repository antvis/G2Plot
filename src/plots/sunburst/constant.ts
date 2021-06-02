import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { SunburstOptions } from './types';

/**
 * 祖先节点，非 root 根节点
 */
export const SUNBURST_ANCESTOR_FIELD = 'ancestor-node';
export const SUNBURST_X_FIELD = 'name';
export const SUNBURST_PATH_FIELD = 'path';

/** 默认的源字段 */
export const RAW_FIELDS = [SUNBURST_X_FIELD, SUNBURST_PATH_FIELD, 'depth', 'height'];

/**
 * 旭日图 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<SunburstOptions> = deepAssign({}, Plot.getDefaultOptions(), {
  innerRadius: 0,

  // 分层配置
  hierarchyConfig: {
    // 数值字段，默认是 value（可配置）
    field: 'value',
  },

  // 组件
  tooltip: {
    shared: true,
    showMarkers: false,
    offset: 20,
    showTitle: false,
  },

  // 样式设置
  sunburstStyle: {
    lineWidth: 0.5,
    stroke: '#FFF',
  },
});
