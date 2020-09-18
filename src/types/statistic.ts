import { StyleAttr } from './attr';
import { Data, Datum } from './common';

type StatisticText = {
  /** 统计文本的样式 */
  readonly style?: StyleAttr;
  /** 文本的格式化 */
  readonly formatter?: (datum?: Datum, data?: Data /** filterData */) => string;
  readonly rotate?: number;
  readonly offsetX?: number;
  readonly offsetY?: number;
};

/**
 * 中心文本的统计信息，统一一个数据结构
 */
export type Statistic = {
  readonly title?: false | StatisticText;
  readonly content?: false | StatisticText;
};
