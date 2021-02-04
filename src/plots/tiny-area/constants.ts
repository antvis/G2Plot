import { DEFAULT_TOOLTIP_OPTIONS } from '../tiny-line/constants';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS = {
  appendPadding: 2,
  tooltip: {
    ...DEFAULT_TOOLTIP_OPTIONS,
  },
  // 默认样式
  color: 'l(90) 0:#E5EDFE 1:#ffffff',
  areaStyle: {
    fillOpacity: 0.6,
  },
  line: {
    size: 1,
    color: '#5B8FF9',
  },
  animation: {},
};
