import { VennOptions } from './types';

// 一些字段常量定义，需要在文档初告知用户
export const ID_FIELD = 'id';
export const SETS_FIELD = 'sets';
export const SIZE_FIELD = 'size';
export const PATH_FIELD = 'path';

/**
 * 韦恩图 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<VennOptions> = {
  blendMode: 'multiply',
  tooltip: {
    showMarkers: false,
  },
};
