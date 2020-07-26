import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

export interface RadarOptions extends Options {
  readonly xField: string;
  readonly yField: string;
  /** 分组字段 */
  readonly seriesField?: string;
  /** 是否平滑 */
  readonly smooth?: boolean;
  /** 折线图形样式 */
  readonly lineStyle?: ShapeStyle | ((x: any, y: any, series?: any) => ShapeStyle);
  /** 数据点图形样式, 均提供回调的方式, 不开放 field 映射配置 */
  readonly point?: {
    color?: string | string[] | ((series: any) => string);
    shape?: string | ((x: any, y: any, series?: any) => string);
    size?: number | ((x: any, y: any, series?: any) => number);
    style?: ShapeStyle | ((x: any, y: any, series?: any) => ShapeStyle);
  };
  /** area 图形样式, 均提供回调的方式, 不开放 field 映射配置 */
  readonly area?: {
    style?: ShapeStyle | ((x: any, y: any, series?: any) => ShapeStyle);
  };
  /** 角度轴配置 */
  readonly xAxis?: any;
  /** 径向轴配置 */
  readonly yAxis?: any;
  /** 雷达图半径 */
  readonly radius?: number;
}
