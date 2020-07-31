import { ShapeStyle } from '../../types/style';
import { Axis } from '../../types/axis';
import { ChartOptions, Options } from '../../types';
import { PointGeometryOptions, LineGeometryOptions } from '../../adaptor/geometries';

export enum AxisType {
  Left = 'Left',
  Right = 'Right',
}

export enum BiaxGeometry {
  Line = 'Line',
  Column = 'Column',
  StackColumn = 'StackColumn',
  GroupedColumn = 'GroupedColumn',
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
