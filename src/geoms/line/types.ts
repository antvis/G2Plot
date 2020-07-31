import { ShapeStyle } from '../../types/style';

export interface LineGeoConfig{
  /** 映射至 x 轴字段 */
  readonly xField: string;
  /** 映射至 x 轴字段 */
  readonly yField: string;
  /** 映射至分组字段 */
  readonly seriesField?: string;

  /** 是否平滑 */
  readonly smooth?: boolean;
  /** 是否连接空数据 */
  readonly connectNulls?: boolean;
  /** 折线图形样式 */
  readonly lineStyle?: ShapeStyle | ((x?: any, y?: any, color?: any) => ShapeStyle);
}
