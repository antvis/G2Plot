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

type CommonGeometryOption = {
  // 图形类型
  readonly geometry?: string;
  // label
  readonly label?: Options['label'];
  // 色板
  readonly color?: Options['color'];
  // 是否分组
  readonly isGroup?: boolean;
  // 分组字段，优先级高于 seriesField
  readonly groupField?: string;
};

// 折线设置接口, 直接用 LineOption 吧
export type GeometryLineOption = Pick<
  LineOptions,
  'seriesField' | 'smooth' | 'connectNulls' | 'lineStyle' | 'point' | 'isStack' | 'stepType'
> &
  CommonGeometryOption;

// 柱设置接口
export type GeometryColumnOption = Pick<
  ColumnOptions,
  'seriesField' | 'isGroup' | 'isStack' | 'isRange' | 'isPercent' | 'columnWidthRatio' | 'marginRatio' | 'columnStyle'
> &
  CommonGeometryOption;

export type GeometryOption = GeometryColumnOption | GeometryLineOption;

export type DualAxesOptions = Omit<Options, 'data' | 'yAxis' | 'color' | 'annotations'> & {
  /**
   * 具体的数据，左右两边的数据
   */
  readonly data: Array<Record<string, any>[]>;

  /**
   * 双轴图的 x 字段，x 字段名称需要保持一致
   */
  readonly xField: string;
  /**
   * 双轴图左右 y 字段，需要不一致
   */
  readonly yField: string[];

  /**
   * 左右两边的 yAxis 配置，使用 object 的方式，key 为 y 字段名，或者数组分别表示左右
   */
  readonly yAxis?: Options['yAxis'][] | Record<string, Options['yAxis']>;

  /**
   * 左右两边的图形配置
   */
  readonly geometryOptions?: GeometryOption[];

  /**
   * 左右两边的 annotation 配置, 同时支持数组和object 两种形式，以防出现 field 相同无法设置的情况
   */
  readonly annotations?: Options['annotations'][] | Record<string, Options['annotations']>;
};
