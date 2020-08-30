import { Options } from '../../types';

export interface CandleOptions extends Options {
  /** x 轴字段  日期*/
  readonly xField: string;
  /** y 轴映射 range  【开盘价/收盘价/最高价/最低价】
   * 设置一个指定 [open, close, high, low]【开盘价/收盘价/最高价/最低价】字段的数组 */
  readonly yField: [string, string, string, string];
}

/**
 *  TODO：
 *  2. seris   字段配置
 *  3. tickCount支持按宽度计算
 *  4.Annotation(最高价，最低价)
 *  5.交互
 *  6.均线
 *  7.成交量
 *  8.数据过滤
 *  9.公式函数
 */
