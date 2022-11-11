import { AreaGeometryOptions, PointGeometryOptions } from '../../adaptor/geometries';
import { Options, ShapeStyle } from '../../types';

export interface RadarOptions extends Options {
  /**
   * @title x轴字段
   */
  readonly xField: string;
  /**
   * @title y轴字段
   * @description 映射雷达图的射线长度
   */
  readonly yField: string;
  /**
   * @title 分组字段
   */
  readonly seriesField?: string;
  /**
   * @title 是否平滑
   * @default false
   */
  readonly smooth?: boolean;
  /**
   * @title 折线图形样式
   */
  readonly lineStyle?: ShapeStyle | ((x: any, y: any, series?: any) => ShapeStyle);
  /**
   * @title 数据点图形样式
   */
  readonly point?: PointGeometryOptions['point'] & Pick<PointGeometryOptions, 'state'>;
  /**
   * @title area 图形样式
   * @description 均提供回调的方式, 不开放 field 映射配置
   */
  readonly area?: AreaGeometryOptions['area'];
  /**
   * @title 角度轴配置
   */
  readonly xAxis?: any;
  /**
   * @title 径向轴配置
   */
  readonly yAxis?: any;
  /**
   * @title 雷达图半径
   */
  readonly radius?: number;
  /**
   * @title 雷达图开始角度
   */
  readonly startAngle?: number;
  /**
   * @title 雷达图结束角度
   */
  readonly endAngle?: number;
}
