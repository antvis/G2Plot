import { Options, StyleAttr } from '../../types';

export interface StockOptions extends Options {
  /** x 轴字段  日期*/
  readonly xField: string;
  /** y 轴映射 range  【开盘价/收盘价/最高价/最低价】
   * 设置一个指定 [open, close, high, low]【开盘价/收盘价/最高价/最低价】字段的数组 */
  readonly yField: [string, string, string, string];

  /** 颜色配置, 不支持 color 配置 */
  /** 上涨色 */
  readonly risingFill?: string;
  /** 下跌色 */
  readonly fallingFill?: string;

  /** 样式配置 */
  readonly stockStyle?: StyleAttr;
}
