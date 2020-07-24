import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

export interface LineOptions extends Options {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
  /** 分组字段 */
  readonly seriesField?: string;
  /** 是否平滑 */
  readonly smooth?: boolean;
  /** 是否连接空数据 */
  readonly connectNulls?: boolean;
  /** 折线图形样式 */
  readonly lineStyle?: ShapeStyle | ((x?: any, y?: any, color?: any) => ShapeStyle);
  /** 折线数据点图形样式 */
  readonly point?: {
    /** point shape 映射 */
    readonly shape?: string | ((x?: any, y?: any, color?: any) => string);
    /** 大小映射，先简化处理为确定值 */
    readonly size?: number;
    /** 样式映射 */
    readonly style?: ShapeStyle | ((x?: any, y?: any, color?: any) => ShapeStyle);
  };
}
