import { Options, ShapeStyle, Statistic, StyleAttr } from '../../types';
import { Axis } from '../../types/axis';
import { PERCENT, RANGE_TYPE, RANGE_VALUE } from './constants';

/** 指标指标的配置 */
export type Indicator = {
  /**
   * @title 指针
   * @description 只允许静态的 object
   */
  readonly pointer?: {
    readonly style?: ShapeStyle;
  };
  /**
   * @title 圆环
   * @description 只允许静态的 object
   */
  readonly pin?: {
    readonly style?: ShapeStyle;
  };
  /**
   * @title 自定义指针 shape
   * @default 'gauge-indicator'
   */
  readonly shape?: string;
};

export type Range = {
  /**
   * @title 辅助的刻度值
   * @description 0 ~ 1 的数字
   */
  readonly ticks?: number[];
  /**
   * @title 辅助刻度的颜色配置
   */
  readonly color?: string | string[];
  /**
   * @title 仪表盘辅助背景的宽度
   */
  readonly width?: number;
};

/**
 * @title 仪表盘辅助生成的 rangeData
 */
export type GaugeRangeData = {
  readonly [RANGE_VALUE]?: number;
  readonly [RANGE_TYPE]: string;
  readonly [PERCENT]: number;
}[];

/**
 * @title 仪表盘配置类型定义
 */
export interface GaugeOptions
  extends Omit<Options, 'data' | 'legend' | 'xAxis' | 'yAxis' | 'xField' | 'yField' | 'color'> {
  /**
   * @title 指标的比例
   * @description 范围0 ~ 1
   */
  readonly percent: number;
  /**
   * @title 外弧度
   * @description 范围0 ~ 1
   */
  readonly radius?: number;
  /**
   * @title 内弧度
   * @description 范围0 ~ 1
   */
  readonly innerRadius?: number;
  /**
   * @title 弧度起始
   */
  readonly startAngle?: number;
  /**
   * @title 弧度结束
   */
  readonly endAngle?: number;
  /**
   * @title 辅助的 range 组件
   */
  readonly range?: Range;
  /**
   * @title 坐标轴配置
   */
  readonly axis?: Axis;
  /**
   * @title 指针的配置
   */
  readonly indicator?: false | Indicator;
  /**
   * @title 统计文本
   */
  readonly statistic?: Statistic;
  /**
   * @title 仪表盘样式
   */
  readonly gaugeStyle?: StyleAttr;

  /**
   * @title meter gauge 相关配置
   */

  /**
   * @title 仪表盘类型
   * @description 可选项: 'meter', default 为空
   */
  readonly type?: string;
  /**
   * @title 仪表盘配置
   * @description 当仪表盘类型 = 'meter' 生效
   */
  readonly meter?: {
    /**
     * @title 仪表盘总步数
     * @default "50"
     */
    readonly steps?: number;
    /**
     * @title step 与 gap 的宽度占比
     * @default "0.5"
     */
    readonly stepRatio?: number;
  };
}

/**
 * @title 仪表盘
 * @description 自定义 shape 使用的 customInfo
 */
export type GaugeCustomInfo = {
  /**
   * @title 仪表盘 meter 类型的相关配置
   */
  readonly meter?: GaugeOptions['meter'];
};
