import { ShapeStyle } from '../../types/style';
import { Axis } from '../../types/axis';
import { Options } from '../../types';

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
export type LineConfig = {
  readonly geometry: string;
  // TODO Review
  readonly color?: string;
  readonly lineSize?: number;
  readonly seriesField?: string;
  readonly label?: any;

  /** 是否平滑 */
  readonly smooth?: boolean;
  /** 是否连接空数据 */
  readonly connectNulls?: boolean;
  /** 折线图形样式 */
  readonly lineStyle?: ShapeStyle | ((x?: any, y?: any, color?: any) => ShapeStyle);
  /** 折线数据点图形样式 */
  readonly point?: {
    /** point shape 映射 */
    readonly shape?: string | ((x?: any, y?: any, color?: any) => string);
    /** 大小映射，先简化处理为确定值 */
    readonly size?: number;
    /** 样式映射 */
    readonly style?: ShapeStyle | ((x?: any, y?: any, color?: any) => ShapeStyle);
  };
};

// 柱设置接口
export type ColumnConfig = {
  readonly geometry: BiaxGeometry.Column;
};

export type GeometryConfig = LineConfig | ColumnConfig;

export type BiaxOptionType = {
  readonly xField: string;
  readonly yField: string[];

  /**增加 Y 轴的 leftConfig and rightConfig */
  readonly yAxis?: Axis[];

  /** 图形样式 */
  readonly geometryConfigs?: GeometryConfig[];
};

type BiaxCommonOptionType = Options & BiaxOptionType;

export interface BiaxOption extends BiaxCommonOptionType {}
