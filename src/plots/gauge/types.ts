import { Options, ShapeStyle, Statistic } from '../../types';
import { Axis } from '../../types/axis';

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

type Range = {
  /** 辅助的刻度值 0 ~ 1 的数字 */
  readonly ticks?: number[];
  /** 辅助刻度的颜色配置 */
  readonly color?: string | string[];
};

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
}
