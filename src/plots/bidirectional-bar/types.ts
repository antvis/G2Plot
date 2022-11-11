import { Options, StyleAttr } from '../../types';
import { Axis } from '../../types/axis';

export interface BidirectionalBarOptions extends Omit<Options, 'yAxis' | 'yField'> {
  /**
   * @title x轴字段
   */
  readonly xField: string;
  /**
   * @title y轴字段
   */
  readonly yField: [string, string];
  /**
   * @title yAxis
   * @description yAxis 为多个 key 为 yField 里面的 2 个字段
   */
  readonly yAxis?:
    | false
    | {
        [key: string]: Axis;
      };
  /**
   * @title 柱状图宽度占比
   * @description 范围[0-1]
   */
  readonly widthRatio?: number;
  /**
   * @title 柱状图柱子样式
   */
  readonly barStyle?: StyleAttr;
  /**
   * @title 布局方向选择
   * @default "horizontal"
   */
  readonly layout?: 'horizontal' | 'vertical';
}
