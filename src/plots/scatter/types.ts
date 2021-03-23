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

export interface RegressionLineOptions {
  /** 是否顶层显示，默认 false  */
  readonly top?: boolean;
  /** 回归线类型  */
  readonly type?: string;
  /** 配置回归线样式  */
  readonly style?: ShapeStyle;
  /** 自定义算法 [[0,0],[100,100]] */
  readonly algorithm?: Array<[number, number]> | ((data: any) => Array<[number, number]>);
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
  /** size 对应的图例 */
  readonly sizeLegend?: Options['legend'];
  /** 散点图大小 */
  readonly size?: SizeAttr;
  /** 点形状映射对应的数据字段名 */
  readonly shapeField?: string;
  /** shape 对应的图例 */
  readonly shapeLegend?: Options['legend'];
  /** 散点图形状 */
  readonly shape?: ShapeAttr;
  /** 散点图样式 */
  readonly pointStyle?: StyleAttr;
  /** 点颜色映射对应的数据字段名 */
  readonly colorField?: string;
  /** 四象限组件 */
  readonly quadrant?: QuadrantOptions;
  /** 归曲线 */
  readonly regressionLine?: RegressionLineOptions;
}
