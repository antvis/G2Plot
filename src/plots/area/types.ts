import { PointGeometryOptions } from '../../adaptor/geometries';
import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';
import { LineGeometryOptions } from '../../adaptor/geometries';

/** 面积图的配置类型定义 */
export interface AreaOptions extends Options {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
  /** 分组字段 */
  readonly seriesField?: string;
  /** 是否平滑 */
  readonly smooth?: boolean;
  /** 面积图形样式 */
  readonly areaStyle?: ShapeStyle | ((x?: any, y?: any, color?: any) => ShapeStyle);
  /** 面积中折线的样式 */
  readonly line?: LineGeometryOptions['line'];
  /** 面积图数据点图形样式 */
  readonly point?: PointGeometryOptions['point'];
}
