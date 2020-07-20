import { Options } from '../../../types';
import { ShapeStyle } from '../../../types/style';

// @ts-ignore
export interface TinyLineOptions extends Options {
  data: any[];
  /** 是否平滑 */
  smooth?: boolean;
  /** 是否连接空数据 */
  connectNulls?: boolean;
  /** 折线extra图形样式 */
  lineStyle?: ShapeStyle | (() => ShapeStyle);
}
