import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

export interface RoseOptions extends Options {
  /** 扇形切片半径长度所对应的数据字段名 */
  readonly radiusField: string;
  /** 扇形切片分类所对应的数据字段名（每个扇形的弧度相等） */
  readonly seriesField?: string;
  /** 扇形切片颜色所对应的数据字段名 */
  readonly colorField?: string;
  /**
   * 玫瑰图的半径，原点为画布中心。配置值域为 [0,1]
   * 0 代表玫瑰图大小为 0，即不显示，1 代表玫瑰图撑满绘图区域
   */
  readonly radius?: number;
  /** 内部空心圆的半径，规则与 radius 一致 */
  readonly innerRadius?: number;
  /**
   * 设置扇形样式。sectorStyle 中的fill会覆盖 color 的配置
   * sectorStyle 可以直接指定，也可以通过 callback 的方式，根据数据为每个扇形切片指定单独的样式
   */
  readonly sectorStyle?: ShapeStyle | ((series: string) => ShapeStyle);
}
