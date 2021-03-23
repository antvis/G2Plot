import { PointGeometryOptions } from '../../adaptor/geometries';
import { Options, StyleAttr } from '../../types';
import { LineGeometryOptions } from '../../adaptor/geometries';

/** 面积图的配置类型定义 */
export interface AreaOptions extends Options {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
  /** 分组字段 */
  readonly seriesField?: string;
  /** 是否堆积 */
  readonly isStack?: boolean;
  /** 是否百分比 */
  readonly isPercent?: boolean;
  /** 是否平滑 */
  readonly smooth?: boolean;
  /** 面积图形样式 */
  readonly areaStyle?: StyleAttr;
  /** 面积中折线的样式 */
  readonly line?: LineGeometryOptions['line'];
  /** 面积图数据点图形样式 */
  readonly point?: PointGeometryOptions['point'] & Pick<PointGeometryOptions, 'state'>;
  /** 积图是否从 0 基准线开始填充 */
  readonly startOnZero?: boolean;
}
