import { Options, RegionPositionBaseOption, TextOption, AnnotationPosition } from '../../types';
import { ShapeStyle } from '../../types/style';

interface PointStyle {
  /** 填充色 会覆盖 color 配置  */
  readonly fill?: string;
  /** 描边颜色  */
  readonly stroke?: string;
  /** 线宽  */
  readonly lineWidth?: number;
  /** 虚线显示  */
  readonly lineDash?: number[];
  /** 透明度  */
  readonly opacity?: number;
  /** 填充透明度  */
  readonly fillOpacity?: number;
  /** 描边透明度  */
  readonly strokeOpacity?: number;
}

interface Labels extends Omit<TextOption, 'position'> {
  position?: AnnotationPosition;
}

interface Quadrant {
  /** x 方向上的象限分割基准线，默认为 0  */
  readonly xBaseline?: number;
  /** y 方向上的象限分割基准线，默认为 0  */
  readonly yBaseline?: number;
  /** 配置象限分割线的样式  */
  readonly lineStyle?: RegionPositionBaseOption;
  /** 象限样式 */
  readonly regionStyle?: RegionPositionBaseOption[];
  /** 象限文本配置  */
  readonly labels?: Labels[];
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
  /** 数据调整类型 */
  readonly type?: 'jitter' | 'stack' | 'symmetric' | 'dodge';
  /** 点大小映射对应的数据字段名 */
  readonly sizeField?: string;
  /** 散点图大小 */
  readonly size?: number | [number, number] | ((value: number) => number);
  /** 点形状映射对应的数据字段名 */
  readonly shapeField?: string;
  /** 散点图形状 */
  readonly shape?: string | string[] | ((shape: string) => string);
  /** 散点图样式 */
  readonly pointStyle?: PointStyle | ((x: number, y: number, colorfield?: string) => ShapeStyle);
  /** 点颜色映射对应的数据字段名 */
  readonly colorField?: string;
  /** 四象限组件 */
  readonly quadrant?: Quadrant;
  /** 趋势线组件，为图表添加回归曲线 */
  readonly trendLine?: TrendLine;
}
