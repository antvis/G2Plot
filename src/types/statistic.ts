import { StyleAttr } from './attr';
import { Data, Datum } from './common';

type StatisticText<S = StyleAttr> = {
  /** 统计文本的样式 */
  readonly style?: S;
  /** 文本的格式化 */
  readonly formatter?: (datum?: Datum, data?: Data /** filterData */) => string;
  readonly rotate?: number;
  readonly offsetX?: number;
  readonly offsetY?: number;
};

/**
 * 中心文本的统计信息，统一一个数据结构
 */
export type Statistic<S = StyleAttr> = {
  readonly title?: false | StatisticText<S>;
  readonly content?: false | StatisticText<S>;
};
