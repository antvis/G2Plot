import { GeometryOptions, LineGeometryOptions, PointGeometryOptions } from '../../adaptor/geometries';
import { Options, StyleAttr } from '../../types';
import { Transformations } from '../../types/coordinate';

/** 面积图的配置类型定义 */
export interface AreaOptions extends Options, Pick<GeometryOptions, 'customInfo'> {
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
   * @title 是否配置堆积
   * @default false
   */
  readonly isStack?: boolean;
  /**
   * @title 是否配置百分比
   * @default false
   */
  readonly isPercent?: boolean;
  /**
   * @title 是否配置平滑
   * @default false
   */
  readonly smooth?: boolean;
  /**
   * @title 面积图形样式
   */
  readonly areaStyle?: StyleAttr;
  /**
   * @title 面积中折线的样式
   */
  readonly line?: LineGeometryOptions['line'] & Pick<PointGeometryOptions, 'state'>;
  /**
   * @title 面积图数据点图形样式
   */
  readonly point?: PointGeometryOptions['point'] & Pick<PointGeometryOptions, 'state'>;
  /**
   * @title 面积图填充
   * @description 面积图是否从 0 基准线开始填充
   * @default false
   */
  readonly startOnZero?: boolean;

  /**
   * @title 坐标转换
   * @description 可以对坐标系进行转换，如: reflectX, reflectY, transpose 等
   */
  readonly coordinate?: Transformations;
}
