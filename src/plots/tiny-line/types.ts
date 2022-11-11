import { MappingOptions } from '../../adaptor/geometries/base';
import { PointGeometryOptions } from '../../adaptor/geometries/point';
import { Options, StyleAttr } from '../../types';

/** mini 图类型定义需要 omit 很多的 G2 Options 配置 */
export interface TinyLineOptions extends Omit<Options, 'data' | 'legend' | 'label'> {
  /**
   * @title 具体的数据
   */
  readonly data: number[];
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
   * @title 折线点图形样式
   */
  readonly point?: MappingOptions & Pick<PointGeometryOptions, 'state'>;
}
