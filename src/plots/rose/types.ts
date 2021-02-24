import { Options, StyleAttr } from '../../types';

export interface RoseOptions extends Options {
  /** 扇形切片分类所对应的数据字段名（每个扇形的弧度相等） */
  readonly xField: string;
  /** 扇形切片半径长度所对应的数据字段名 */
  readonly yField: string;
  /** 拆分字段 */
  readonly seriesField?: string;
  /** 是否分组玫瑰图 */
  readonly isGroup?: boolean;
  /** 是否堆积玫瑰图 */
  readonly isStack?: boolean;
  /**
   * 玫瑰图的半径，原点为画布中心。配置值域为 (0,1]
   * 1 代表玫瑰图大小为 1，即撑满绘图区域
   */
  readonly radius?: number;
  /** 内部空心圆的半径，规则与 radius 一致 */
  readonly innerRadius?: number;
  /** 玫瑰图开始角度 */
  readonly startAngle?: number;
  /** 玫瑰图结束角度 */
  readonly endAngle?: number;
  /**
   * 设置扇形样式。sectorStyle 中的fill会覆盖 color 的配置
   * sectorStyle 可以直接指定，也可以通过 callback 的方式，根据数据为每个扇形切片指定单独的样式
   */
  readonly sectorStyle?: StyleAttr;
}
