import { Options } from '../../types';

export interface StockOptions extends Options {
  /** x 轴字段  日期*/
  readonly xField: string;
  /** y 轴映射 range  【开盘价/收盘价/最高价/最低价】
   * 设置一个指定 [open, close, high, low]【开盘价/收盘价/最高价/最低价】字段的数组 */
  readonly yField: [string, string, string, string];

  /** 趋势字段，用于展示阴阳线 默认为 'trend' */
  readonly trendField?: string;
  /** 计算趋势的方式, 返回：  up-上涨  down-下跌 normal-持平 */
  readonly trend?: (item: any, index: number) => string;
}
