import { Options } from '../../types';

export interface TreemapOptions extends Omit<Options, 'data'> {
  /** 颜色字段 */
  readonly colorField?: string;
  readonly data?: Record<string, any>;
}
