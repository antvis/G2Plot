import { AxisOption } from '@antv/g2/lib/interface';

export type Axis = AxisOption & {
  /**
   * 期望的坐标轴刻度数量，非最终结果
   */
  readonly tickCount?: number;

  /**
   * 坐标轴刻度间隔
   */
  readonly tickInterval?: number;

  /**
   * 坐标轴最小值
   */
  readonly min?: number;

  /**
   * 坐标轴最大值
   */
  readonly max?: number;
};
