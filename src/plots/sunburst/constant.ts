import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { CHILD_NODE_COUNT, NODE_ANCESTORS_FIELD, NODE_INDEX_FIELD } from '../../utils/hierarchy/util';
import { SunburstOptions } from './types';

/**
 * 祖先节点，非 root 根节点
 */
export const SUNBURST_ANCESTOR_FIELD = 'ancestor-node';
export const SUNBURST_Y_FIELD = 'value';
export const SUNBURST_PATH_FIELD = 'path';

/** 默认的源字段 */
export const RAW_FIELDS = [
  SUNBURST_PATH_FIELD,
  NODE_INDEX_FIELD,
  NODE_ANCESTORS_FIELD,
  CHILD_NODE_COUNT,
  'name',
  'depth',
  'height',
];

/**
 * 旭日图 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<SunburstOptions> = deepAssign({}, Plot.getDefaultOptions(), {
  innerRadius: 0,
  radius: 0.85,

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
  legend: false,

  // 样式设置
  sunburstStyle: {
    lineWidth: 0.5,
    stroke: '#FFF',
  },

  // 默认开启交互
  drilldown: { enabled: true },
});
