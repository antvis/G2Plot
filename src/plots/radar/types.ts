import { PointGeometryOptions, AreaGeometryOptions } from '../../adaptor/geometries';
import { Options, ShapeStyle } from '../../types';

export interface RadarOptions extends Options {
  /** x 字段 */
  readonly xField: string;
  /** y 字段，映射雷达图的射线长度 */
  readonly yField: string;
  /** 分组字段 */
  readonly seriesField?: string;
  /** 是否平滑 */
  readonly smooth?: boolean;
  /** 折线图形样式 */
  readonly lineStyle?: ShapeStyle | ((x: any, y: any, series?: any) => ShapeStyle);
  /** 数据点图形样式 */
  readonly point?: PointGeometryOptions['point'] & Pick<PointGeometryOptions, 'state'>;
  /** area 图形样式, 均提供回调的方式, 不开放 field 映射配置 */
  readonly area?: AreaGeometryOptions['area'];
  /** 角度轴配置 */
  readonly xAxis?: any;
  /** 径向轴配置 */
  readonly yAxis?: any;
  /** 雷达图半径 */
  readonly radius?: number;
  /** 雷达图开始角度 */
  readonly startAngle?: number;
  /** 雷达图结束角度 */
  readonly endAngle?: number;
}
