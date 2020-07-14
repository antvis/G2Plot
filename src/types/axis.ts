import { AxisOption } from '@antv/g2/lib/interface';

export type Axis = AxisOption & {
  /**
   * 是否美化
   */
  readonly nice?: boolean;

  /**
   * 坐标轴最小值
   */
  readonly min?: number;

  /**
   * 坐标轴最大值
   */
  readonly max?: number;

  /**
   * min limit
   */
  readonly minLimit?: number;

  /**
   * max limit
   */
  readonly maxLimit?: number;

  /**
   * 期望的坐标轴刻度数量，非最终结果
   */
  readonly tickCount?: number;

  /**
   * 坐标轴刻度间隔
   */
  readonly tickInterval?: number;

  /**
   * 自定义计算 tick 的方法
   */
  readonly tickMethod?: (scale: any) => any[];
};
