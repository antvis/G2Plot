import { VennOptions } from './types';

// 一些字段常量定义，需要在文档初告知用户
export const COLOR_FIELD = 'colorField';

/**
 * 韦恩图 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<VennOptions> = {
  tooltip: {
    showMarkers: false,
  },
};
