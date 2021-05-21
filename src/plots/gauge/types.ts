import { Options, ShapeStyle, Statistic, StyleAttr } from '../../types';
import { Axis } from '../../types/axis';
import { PERCENT, RANGE_TYPE, RANGE_VALUE } from './constants';

/** 指标指标的配置 */
export type Indicator = {
  // 指针
  readonly pointer?: {
    readonly style?: ShapeStyle; // 只允许静态的 object
  };
  // 圆环
  readonly pin?: {
    readonly style?: ShapeStyle; // 只允许静态的 object
  };
};

export type Range = {
  /** 辅助的刻度值 0 ~ 1 的数字 */
  readonly ticks?: number[];
  /** 辅助刻度的颜色配置 */
  readonly color?: string | string[];
  /** 仪表盘辅助背景的宽度 */
  readonly width?: number;
};

/**
 * 仪表盘辅助生成的 rangeData
 */
export type GaugeRangeData = {
  readonly [RANGE_VALUE]?: number;
  readonly [RANGE_TYPE]: string;
  readonly [PERCENT]: number;
}[];

/** 仪表盘配置类型定义 */
export interface GaugeOptions
  extends Omit<Options, 'data' | 'tooltip' | 'legend' | 'xAxis' | 'yAxis' | 'xField' | 'yField' | 'color'> {
  /** 指标的比例 0 ~ 1 */
  readonly percent: number;
  /** 外弧度 0 ~ 1 */
  readonly radius?: number;
  /** 内弧度 0 ~ 1 */
  readonly innerRadius?: number;
  /** 弧度起始 */
  readonly startAngle?: number;
  /** 弧度结束 */
  readonly endAngle?: number;
  /** 辅助的 range 组件 */
  readonly range?: Range;
  /** 坐标轴配置 */
  readonly axis?: Axis;
  /** 指针的配置 */
  readonly indicator?: false | Indicator;
  /** 统计文本 */
  readonly statistic?: Statistic;
  /** 仪表盘样式 */
  readonly gaugeStyle?: StyleAttr;

  // meter gauge 相关配置
  /** 仪表盘类型, 可选项: 'meter', default 为空 */
  readonly type?: string;
  /** 当仪表盘类型 = 'meter' 生效 */
  readonly meter?: {
    /** 仪表盘总步数, default: 50 */
    readonly steps?: number;
    /** step 与 gap 的宽度占比, default: 0.5 */
    readonly stepRatio?: number;
  };
}

/**
 * 仪表盘 自定义 shape 使用的 customInfo
 */
export type GaugeCustomInfo = {
  /** 仪表盘 meter 类型的相关配置 */
  readonly meter?: GaugeOptions['meter'];
};
