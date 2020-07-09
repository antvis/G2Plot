import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

export interface LineOptions extends Options {
  /** x 轴字段 */
  xField?: string;
  /** y 轴字段 */
  yField?: string;
  /** 分组字段 */
  seriesField?: string;

  /** 是否平滑 */
  smooth?: boolean;
  /** 是否连接空数据 */
  connectNulls?: boolean;
  /** 折线extra图形样式 */
  lineStyle?: ShapeStyle | (() => ShapeStyle);
  /** 折线数据点图形样式 */
  point?: {
    visible?: boolean;
    shape?: ShapeStyle;
    size?: number;
    color?: string;
    style?: ShapeStyle;
  };
}
