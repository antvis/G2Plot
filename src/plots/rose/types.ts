import { GeometryOptions, IntervalGeometryOptions } from '../../adaptor/geometries';
import { Options, StyleAttr } from '../../types';

export interface RoseOptions extends Options, Pick<GeometryOptions, 'customInfo'> {
  /**
   * @title 扇形切片分类所对应的数据字段名
   * @description 每个扇形的弧度相等
   */
  readonly xField: string;
  /**
   * @title 扇形切片半径长度所对应的数据字段名
   */
  readonly yField: string;
  /**
   * @title 拆分字段
   */
  readonly seriesField?: string;
  /**
   * @title 是否分组玫瑰图
   * @default false
   */
  readonly isGroup?: boolean;
  /**
   * @title 是否堆积玫瑰图
   * @default false
   */
  readonly isStack?: boolean;
  /**
   * @title 玫瑰图的半径
   * @description 原点为画布中心。配置值域为 (0,1] 1 代表玫瑰图大小为 1，即撑满绘图区域
   */
  readonly radius?: number;
  /**
   * @title 内部空心圆的半径
   * @description 规则与 radius 一致
   */
  readonly innerRadius?: number;
  /**
   * @title 玫瑰图开始角度
   */
  readonly startAngle?: number;
  /**
   * @title 玫瑰图结束角度
   */
  readonly endAngle?: number;
  /**
   * @title 设置扇形样式
   * @description sectorStyle 中的fill会覆盖 color 的配置,sectorStyle 可以直接指定，也可以通过 callback 的方式，根据数据为每个扇形切片指定单独的样式
   */
  readonly sectorStyle?: StyleAttr;
  /**
   * @title 扇形自定义形状
   * @description interval 图形元素展示形状
   */
  readonly shape?: Required<IntervalGeometryOptions>['interval']['shape'];
}
