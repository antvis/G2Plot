import type { Options } from '../../types/common';

export type StockOptions = Omit<Options, 'yField'> & {
  /**
   * @title y 轴映射
   * @description   range  【开盘价/收盘价/最高价/最低价】，设置一个指定 [open, close, high, low]【开盘价/收盘价/最高价/最低价】字段的数组
   */
  yField: [string, string, string, string];
  /**
   * @title 上涨色
   */
  readonly risingFill?: string;
  /**
   * @title 下跌色
   */
  readonly fallingFill?: string;
};
