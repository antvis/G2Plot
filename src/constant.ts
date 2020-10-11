/**
 * 需要从轴配置中提取出来作为 meta 的属性 key 列表
 */
export const AXIS_META_CONFIG_KEYS = [
  'type',
  'tickCount',
  'tickInterval',
  'min',
  'max',
  'nice',
  'minLimit',
  'maxLimit',
  'tickMethod',
];

/**
 * 默认色彩
 */
export const DEFAULT_COLORS = {
  /** 主题色 */
  BRAND_COLOR: '#5B8FF9',
  /** 上涨色 */
  RISING_FILL: '#f4664a',
  /** 下跌色 */
  FALLING_FILL: '#30bf78',
  GRADIENT: {
    CONTINUOUS: '#BAE7FF-#1890FF-#0050B3',
  },
};
