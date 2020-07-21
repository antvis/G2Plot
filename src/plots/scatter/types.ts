import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';
import { Label } from '../../types/label';

interface PointStyle {
  /** 填充色 会覆盖 color 配置  */
  readonly fill?: string;

  /** 描边颜色  */
  readonly stroke?: string;

  /** 线宽  */
  readonly lineWidth?: string;

  /** 虚线显示  */
  readonly lineDash?: string;

  /** 透明度  */
  readonly opacity?: string;

  /** 填充透明度  */
  readonly fillOpacity?: string;

  /** 描边透明度  */
  readonly strokeOpacity?: string;

  /** 映射字段 */
  readonly field?: string;

  /** 根据 field 进行映射 */
  readonly formatter?: (value: string) => PointStyle;
}

interface Quadrant {
  /** 是否显示  */
  readonly visible?: boolean;

  /** x 方向上的象限分割基准线，默认为 0  */
  readonly xBaseline?: number;

  /** y 方向上的象限分割基准线，默认为 0  */
  readonly yBaseline?: number;

  /** 配置象限分割线的样式  */
  readonly lineStyle?: ShapeStyle;

  /** 象限样式 */
  readonly regionStyle?: RegionStyle[];

  /** 象限文本配置  */
  readonly label?: Label;
}

interface RegionStyle {
  /** 填充色  */
  readonly fill?: string;

  /** 不透明度  */
  readonly opacity?: number;
}

interface TrendLine {
  /** 是否显示  */
  readonly visible?: boolean;

  /** 趋势线类型  */
  readonly type?: string;

  /** 配置趋势线样式  */
  readonly style?: ShapeStyle;

  /** 是否绘制置信区间曲线  */
  readonly showConfidence?: boolean;

  /** 配置置信区间样式  */
  readonly confidenceStyle?: ShapeStyle;
}

export interface ScatterOptions extends Options {
  /** x 轴字段 */
  readonly xField: string;

  /** y 轴字段 */
  readonly yField: string;

  /** 分组字段 */
  readonly seriesField?: string;

  /** 散点图大小 */
  readonly pointSize?: number | [number, number] | ((value: number) => number);

  /** 散点图形状 */
  readonly shape?: string[] | ((item: any[]) => string | string[]);

  /** 散点图样式 */
  readonly pointStyle?: PointStyle;

  /** 点颜色映射对应的数据字段名 */
  readonly colorField?: string;

  /** 四象限组件 */
  readonly quadrant?: Quadrant;

  /** 趋势线组件，为图表添加回归曲线 */
  readonly trendLine?: TrendLine;
}
