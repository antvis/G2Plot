import { View } from '@antv/g2';
import { Data, Datum } from './common';

type CSSStyle = Omit<Partial<CSSStyleDeclaration>, 'opacity' | 'fontWeight' | 'lineHeight'> & {
  opacity?: number;
  fontWeight?: string | number;
  lineHeight?: string | number;
};

export type StatisticText = {
  /** 统计文本的样式 */
  readonly style?: CSSStyle | ((datum: Datum) => CSSStyle);
  /** 文本的格式化 */
  readonly formatter?: (datum?: Datum, data?: Data /** filterData */) => string;
  readonly rotate?: number;
  readonly offsetX?: number;
  readonly offsetY?: number;
  /** 自定义中心文本的 html */
  readonly customHtml?: (container: HTMLElement, view: View, datum?: Datum, data?: Data /** filterData */) => string;
};

/**
 * 中心文本的统计信息，统一一个数据结构
 */
export type Statistic = {
  readonly title?: false | StatisticText;
  readonly content?: false | StatisticText;
};
