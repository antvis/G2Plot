import { Options, ShapeAttr, SizeAttr, StyleAttr } from '../../types';
import { LineOptions } from '../line/types';
import { ColumnOptions } from '../column/types';

export enum AxisType {
  Left = 'Left',
  Right = 'Right',
}

export enum DualAxesGeometry {
  Line = 'line',
  Column = 'column',
}

export interface PointConfig {
  readonly shape?: ShapeAttr;
  readonly size?: SizeAttr;
  readonly style?: StyleAttr;
}

type CommonGeometryConfig = {
  // 图形类型
  readonly geometry?: string;
  // label
  readonly label?: Options['label'];
  // 色板
  readonly color?: Options['color'];
};

// 折线设置接口, 直接用 LineOption 吧
export type LineConfig = Pick<LineOptions, 'seriesField' | 'smooth' | 'connectNulls' | 'lineStyle' | 'point'> &
  CommonGeometryConfig;

// 柱设置接口
export type ColumnConfig = Pick<
  ColumnOptions,
  'seriesField' | 'isGroup' | 'isStack' | 'columnWidthRatio' | 'marginRatio' | 'columnStyle'
> &
  CommonGeometryConfig;

export type GeometryConfig = ColumnConfig | LineConfig;

export type DualAxesOption = Omit<Options, 'data' | 'yAxis' | 'color'> & {
  // 通用数据配置
  /** 具体的数据 */
  readonly data: Array<Record<string, any>[]>;

  readonly xField: string;
  readonly yField: string[];

  readonly geometryOptions?: GeometryConfig[];

  readonly yAxis?: Options['yAxis'][];
};
