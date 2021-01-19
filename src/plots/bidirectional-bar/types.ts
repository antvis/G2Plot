import { Axis } from '../../types/axis';
import { Options, StyleAttr } from '../../types';

export interface BidirectionalBarOptions extends Omit<Options, 'yAxis' | 'yField'> {
  /** x 轴字段 */
  readonly xField: string;
  /** y 轴映射字段 */
  readonly yField: [string, string];
  /** yAxis 为多个 key 为 yField 里面的 2 个字段 */
  readonly yAxis?:
    | false
    | {
        [key: string]: Axis;
      };
  /** 柱状图宽度占比 [0-1] */
  readonly widthRatio?: number;
  /** 柱子样式配置，可选 */
  readonly barStyle?: StyleAttr;
  /** layout 方向选择，默认水平 horizontal*/
  readonly layout?: 'horizontal' | 'vertical';
}
