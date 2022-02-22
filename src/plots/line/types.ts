import {
  GeometryOptions,
  AreaGeometryOptions,
  LineGeometryOptions,
  PointGeometryOptions,
} from '../../adaptor/geometries';
import { Options, StyleAttr } from '../../types';

export interface LineOptions extends Options, Pick<GeometryOptions, 'customInfo'> {
  /**
   * @title 阶梯折线图类型
   */
  readonly stepType?: string;
  /**
   * @title x轴字段
   */
  readonly xField?: string;
  /**
   * @title y轴字段
   */
  readonly yField?: string;
  /**
   * @title 分组字段
   */
  readonly seriesField?: string;
  /**
   * @title 是否堆积
   * @default false
   */
  readonly isStack?: boolean;
  /**
   * @title 是否平滑
   * @default false
   */
  readonly smooth?: boolean;
  /**
   * @title 是否连接空数据
   * @default false
   */
  readonly connectNulls?: boolean;
  /**
   * @title 折线图形样式
   */
  readonly lineStyle?: StyleAttr;
  /**
   * @title 折线 shape 配置
   */
  readonly lineShape?: Required<LineGeometryOptions>['line']['shape'];
  /**
   * @title 折线数据点
   * @description 1、图形映射属性 2、状态样式
   */
  readonly point?: PointGeometryOptions['point'] & Pick<PointGeometryOptions, 'state'>;
  /**
   * @title 折线趋势填充色
   * @description 1、图形映射属性
   */
  readonly area?: AreaGeometryOptions['area'] & Pick<PointGeometryOptions, 'state'>;
  /**
   * @title 坐标轴反转配置
   * @description 坐标轴反转配置 'x' | 'y' | ['x', 'y']
   */
  readonly reflect?: 'x' | 'y' | ['x', 'y'];
}
