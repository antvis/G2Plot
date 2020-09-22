import { ColorAttr, Options, ShapeAttr, Statistic } from '../../types';

/** 指针的配置 */
type Indicator = {
  style?: ShapeAttr;
};

type Range = {
  /** 辅助的刻度值 0 ~ 1 的数字 */
  readonly ticks?: number[];
  /** 辅助刻度的颜色配置 */
  readonly color?: ColorAttr;
  /** range 的 size 大小 */
  readonly size?: number;
};

/** 仪表盘配置类型定义 */
export interface GaugeOptions extends Omit<Options, 'data' | 'tooltip' | 'legend' | 'xAxis' | 'yAxis'> {
  /** 指标的比例 0 ~ 1 */
  readonly percent: number;
  /** 弧度起始 */
  readonly startAngle?: number;
  /** 弧度结束 */
  readonly endAngle?: number;
  /** 辅助的 range 组件 */
  readonly range?: Range;
  /** 统计文本 */
  readonly statistic?: Statistic;
  /** 指针的配置 */
  readonly indicator?: Indicator;
}
