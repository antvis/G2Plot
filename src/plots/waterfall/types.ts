import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

export interface WaterfallOptions extends Options {
  /** x 轴字段 */
  readonly xField: string;
  /** y 轴字段 */
  readonly yField: string;
  /** 差值label */
  // readonly diffLabel?: {
  //   readonly visible: boolean;
  //   readonly style?: TextStyle;
  //   formatter?: (text: string, item: object, idx: number) => string;
  // };
  /** 迁移线 */
  // readonly leaderLine?: {
  //   readonly visible: boolean;
  //   readonly style?: ShapeStyle;
  // };
  /** 是否显示总计 */
  readonly showTotal?: boolean;
  /** 总计文案 */
  readonly totalLabel?: string;
  /** 瀑布图style */
  readonly waterfallStyle?: ShapeStyle;
}
