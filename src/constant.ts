/**
 * 需要从轴配置中提取出来作为 meta 的属性 key 列表
 */
export const AXIS_META_CONFIG_KEYS = [
  'type',
  'alias',
  'tickCount',
  'tickInterval',
  'min',
  'max',
  'nice',
  'minLimit',
  'maxLimit',
  'tickMethod',
  // type: 'log' 的底
  'base',
  // type: 'exp' 的指数
  'exponent',
];

/**
 * 默认色彩
 */
export const DEFAULT_COLORS = {
  GRADIENT: {
    CONTINUOUS: '#BAE7FF-#1890FF-#0050B3',
  },
};
