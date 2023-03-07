import {
  AnnotationPosition,
  BrushCfg,
  Options,
  RegionPositionBaseOption,
  ShapeAttr,
  ShapeStyle,
  SizeAttr,
  StyleAttr,
  TextOption,
  TextStyle,
} from '../../types';

interface Labels extends Omit<TextOption, 'position'> {
  position?: AnnotationPosition;
}

interface QuadrantOptions {
  /**
   * @title x 基准线
   * @description x 方向上的象限分割基准线
   * @default 0
   */
  readonly xBaseline?: number;
  /**
   * @title y 基准线
   * @description y 方向上的象限分割基准线
   * @default 0
   */
  readonly yBaseline?: number;
  /**
   * @title 配置象限分割线的样式
   */
  readonly lineStyle?: RegionPositionBaseOption;
  /**
   * @title 象限样式
   */
  readonly regionStyle?: RegionPositionBaseOption[];
  /**
   * @title 象限文本
   */
  readonly labels?: Labels[];
}

export interface RegressionLineOptions {
  /**
   * @title 是否顶层显示
   * @default false
   */
  readonly top?: boolean;
  /**
   * @title 回归线类型
   */
  readonly type?: string;
  /**
   * @title 配置回归线样式
   */
  readonly style?: ShapeStyle;
  /**
   * @title 自定义算法
   * @description  [[0,0],[100,100]]
   */
  readonly algorithm?: Array<[number, number]> | ((data: any) => Array<[number, number]>);
  /**
   * @title 显示回归方程式
   * @description 默认为不显示回归方程式
   */
  readonly showEquation?: boolean;
  /**
   * @title 自定义回归方程式
   * @description 只有当自定义 algorithm 时生效
   */
  readonly equation?: string;
  /**
   * @title 回归线方程式样式
   * @description 自定义文本样式，请参考 TextStyle 配置
   */
  readonly equationStyle?: TextStyle;
}

export interface ScatterOptions extends Options {
  /**
   * @title x 轴字段
   */
  readonly xField: string;
  /**
   * @title y 轴字段
   */
  readonly yField: string;
  /**
   * @title 数据调整类型
   * @description 数据调整类型 'jitter' | 'stack' | 'symmetric' | 'dodge'
   */
  readonly type?: 'jitter' | 'stack' | 'symmetric' | 'dodge';
  /**
   * @title 点大小映射对应的数据字段名
   */
  readonly sizeField?: string;
  /**
   * @title size 对应的图例
   */
  readonly sizeLegend?: Options['legend'];
  /**
   * @title 散点图大小
   */
  readonly size?: SizeAttr;
  /**
   * @title 点形状映射对应的数据字段名
   */
  readonly shapeField?: string;
  /**
   * @title shape 对应的图例
   */
  readonly shapeLegend?: Options['legend'];
  /**
   * @title 散点图形状
   */
  readonly shape?: ShapeAttr;
  /**
   * @title 散点图样式
   */
  readonly pointStyle?: StyleAttr;
  /**
   * @title 点颜色映射对应的数据字段名
   */
  readonly colorField?: string;

  // 图表标注组件

  /**
   * @title 四象限组件
   */
  readonly quadrant?: QuadrantOptions;
  /**
   * @title 归曲线
   */
  readonly regressionLine?: RegressionLineOptions;
  /**
   * @title 图表交互
   */
  readonly brush?: BrushCfg;
}
