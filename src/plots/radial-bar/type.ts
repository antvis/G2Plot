import type { Options } from '../../types/common';

export type RadialBarOptions = Options & {
  /**
   * @title 开始角度
   * @default -Math.PI / 2
   * @description 起始角度，默认从+y轴开始
   */
  startAngle: number;
  /**
   * @title 最大角度
   * @default 270（Math.PI * 3 / 2）
   * @description 从开始角度旋转到最大角度，默认最大角度到-x轴
   */
  maxAngle: number;
  /**
   * @title 指标比例数据
   * @default 1
   * @description 范围[0-1]
   */
  radius: number;
  /**
   * @title 外环的半径
   * @default 1
   * @description 范围[0-1]，相对于画布宽高的最小值来计算的。
   */
  innerRadius: number;
  /**
   * @title 背景配置
   * @default null
   * @description 通过配置color指定颜色参数,必须配合scale.y.domain 指定背景轴的范围区间
   */
  markBackground: Record<string, string>;
};
