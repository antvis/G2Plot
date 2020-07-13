import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

export interface ScatterOptions extends Options {
  /** x 轴字段 */
  xField?: string;

  /** y 轴字段 */
  yField?: string;

  /** 分组字段 */
  seriesField?: string;

  /** 折线数据点图形样式 */
  point?: {
    visible?: boolean;
    shape?: ShapeStyle;
    size?: number;
    color?: string;
    style?: ShapeStyle;
  };
}
