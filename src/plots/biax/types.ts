import { ShapeStyle } from '../../types/style';
import { ChartOptions, Options } from '../../types';
import { PointGeometryOptions, LineGeometryOptions, IntervalGeometryOptions } from '../../adaptor/geometries';

export enum AxisType {
  Left = 'Left',
  Right = 'Right',
}

export enum BiaxGeometry {
  Line = 'line',
  Column = 'column',
}

export interface PointConfig {
  readonly shape?: string | ((x?: any, y?: any, color?: any) => string);
  readonly size?: number;
  readonly style?: ShapeStyle | ((x?: any, y?: any, color?: any) => ShapeStyle);
}

// 折线设置接口
export type LineConfig = LineGeometryOptions['line'] & {
  // 图形类型
  readonly geometry: string;
  // 分类字段
  readonly seriesField?: string;
  // ...lineOption: LineGeometryOptions['line']
  // pointOption
  readonly point?: PointGeometryOptions['point'];
};

// 柱设置接口
export type ColumnConfig = {
  readonly geometry: BiaxGeometry.Column;
  /** 颜色字段，可选 */
  readonly colorField?: string;
  /** 拆分字段，在分组柱状图下同 groupField、colorField，在堆积柱状图下同 stackField、colorField  */
  readonly seriesField?: string;
  /** 是否分组柱形图 */
  readonly isGroup?: boolean;
  /** 分组拆分字段 */
  readonly groupField?: string;
  /** 是否堆积柱状图 */
  readonly isStack?: boolean;
  /** 堆积拆分字段 */
  readonly stackField?: string;
  readonly interval?: IntervalGeometryOptions['interval'];
};

export type GeometryConfig = LineConfig | ColumnConfig;

export type BiaxOption = ChartOptions & {
  // 通用数据配置
  /** 具体的数据 */
  readonly data: Array<Record<string, any>[]>;
  /** 数据字段元信息 */
  readonly meta?: Record<string, any>;

  readonly xField: string;
  readonly yField: string[];

  readonly geometryConfigs?: GeometryConfig[];

  readonly xAxis?: Options['xAxis'];
  readonly yAxis?: Options['yAxis'][];
  readonly label?: Options['label'];
  readonly tooltip?: Options['tooltip'];
  readonly legend?: Options['legend'];
};
