import { Options } from '../../types';

export interface TreemapOptions extends Omit<Options, 'data'> {
  /** 颜色字段 */
  readonly colorField?: string;
  /** 分组字段默认为 **/
  readonly seriesField?: string;
  readonly data?: Record<string, any>;
}
