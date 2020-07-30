import { PointGeometryOptions } from '../../geometries';
import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

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
  readonly line?: {
    /** 折线宽度 */
    readonly size?: number;
    /** 折线样式 */
    readonly style?: ShapeStyle | ((x?: any, y?: any, color?: any) => ShapeStyle);
  };
  /** 面积图数据点图形样式 */
  readonly point?: PointGeometryOptions['point'];
}
