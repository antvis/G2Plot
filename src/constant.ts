/**
 * 需要从轴配置中提取出来作为 meta 的属性 key 列表
 */
export const AXIS_META_CONFIG_KEYS = [
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
 * 钩子函数
 */
export enum CHART_LIFE_CYCLE {
  BEFORE_INIT = 'beforeinit',
  AFTER_INIT = 'afterinit',
  BEFORE_RENDER = 'beforerender',
  AFTER_RENDER = 'afterrender',
  BEFORE_CHANGE_DATA = 'beforechangedata',
  AFTER_CHANGE_DATA = 'afterchangedata',
}
