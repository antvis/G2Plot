import { Options } from '../../types';
import { TextStyle } from '../../types/common';
import { ShapeStyle } from '../../types/style';

export interface WaterfallOptions extends Options {
  /** x 轴字段 */
  readonly xField: string;
  /** y 轴字段 */
  readonly yField: string;
  /** 差值label */
  readonly diffLabel?: {
    readonly visible: boolean;
    readonly style?: TextStyle;
    formatter?: (text: string, item: object, idx: number) => string;
  };
  /** 迁移线 */
  readonly leaderLine?: {
    readonly visible: boolean;
    readonly style?: ShapeStyle;
  };
  /** 显示总计 */
  readonly showTotal?: {
    readonly visible: boolean;
    readonly label: string;
  };
  /** color @todo 完善类型 */
  readonly color?: {};
  /** 瀑布图style @todo 完善类型 */
  readonly waterfallStyle?: {};
}
