import { IGroup } from '@antv/g2/lib/dependents';
import { View } from '@antv/g2';
import {
  Options,
  RegionPositionBaseOption,
  TextOption,
  AnnotationPosition,
  ShapeStyle,
  StyleAttr,
  ShapeAttr,
  SizeAttr,
} from '../../types';

interface Labels extends Omit<TextOption, 'position'> {
  position?: AnnotationPosition;
}

interface QuadrantOptions {
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

export interface TrendlineOptions {
  /** 趋势线类型  */
  readonly type?: string;
  /** 配置趋势线样式  */
  readonly style?: ShapeStyle;
  /** 自定义 path  */
  readonly customPath?:
    | Array<[string, number, number]>
    | ((view: View, group: IGroup) => Array<[string, number, number]>);
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
  readonly size?: SizeAttr;
  /** 点形状映射对应的数据字段名 */
  readonly shapeField?: string;
  /** 散点图形状 */
  readonly shape?: ShapeAttr;
  /** 散点图样式 */
  readonly pointStyle?: StyleAttr;
  /** 点颜色映射对应的数据字段名 */
  readonly colorField?: string;
  /** 四象限组件 */
  readonly quadrant?: QuadrantOptions;
  /** 趋势线组件，为图表添加回归曲线 */
  readonly trendline?: TrendlineOptions;
}
