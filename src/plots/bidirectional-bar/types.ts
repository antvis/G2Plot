import { Axis } from '../../types/axis';
import { Options, StyleAttr } from '../../types';

export interface BidirectionalBarOptions extends Omit<Options, 'yAxis' | 'yField'> {
  /**
  * @title x轴字段
  * @description x轴字段
  */
  readonly xField: string;
  /**
  * @title y轴字段
  * @description y轴字段
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
  * @description 柱状图宽度占比
  * @default [0-1]
  */
  readonly widthRatio?: number;
  /**
  * @title 柱状图柱子样式
  * @description 柱状图柱子样式配置
  */
  readonly barStyle?: StyleAttr;
  /**
  * @title layout(布局)方向选择
  * @description layout(布局)方向选择
  * @default (水平)horizontal
  */
  readonly layout?: 'horizontal' | 'vertical';
}
