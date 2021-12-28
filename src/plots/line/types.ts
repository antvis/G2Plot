import {
  GeometryOptions,
  AreaGeometryOptions,
  LineGeometryOptions,
  PointGeometryOptions,
} from '../../adaptor/geometries';
import { Options, StyleAttr } from '../../types';

export interface LineOptions extends Options, Pick<GeometryOptions, 'customInfo'> {
  /** 阶梯折线图类型 */
  readonly stepType?: string;
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
  /** 分组字段 */
  readonly seriesField?: string;
  /** 是否堆积 */
  readonly isStack?: boolean;
  /** 是否平滑 */
  readonly smooth?: boolean;
  /** 是否连接空数据 */
  readonly connectNulls?: boolean;
  /** 折线图形样式 */
  readonly lineStyle?: StyleAttr;
  /** 折线 shape 配置 */
  readonly lineShape?: Required<LineGeometryOptions>['line']['shape'];
  /** 折线数据点：1、图形映射属性 2、状态样式 */
  readonly point?: PointGeometryOptions['point'] & Pick<PointGeometryOptions, 'state'>;
  /** 折线趋势填充色：1、图形映射属性 */
  readonly area?: AreaGeometryOptions['area'] & Pick<PointGeometryOptions, 'state'>;

  // 其他
  /** 坐标轴反转配置 */
  readonly reflect?: 'x' | 'y' | ['x', 'y'];
}
