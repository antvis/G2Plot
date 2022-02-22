import { Options, StyleAttr } from '../../types';
import { MappingOptions } from '../../adaptor/geometries/base';
import { PointGeometryOptions } from '../../adaptor/geometries/point';

/** mini 图类型定义需要 omit 很多的 G2 Options 配置 */
export interface TinyAreaOptions extends Omit<Options, 'data' | 'legend' | 'label'> {
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
   * @title 面积折线图形样式
   */
  readonly areaStyle?: StyleAttr;
  /**
   * @title 面积折线图形样式
   */
  readonly line?: MappingOptions;
  /**
   * @title 面积点图形样式
   */
  readonly point?: MappingOptions & Pick<PointGeometryOptions, 'state'>;
}
