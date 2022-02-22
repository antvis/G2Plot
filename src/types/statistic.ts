import { View } from '@antv/g2';
import { Data, Datum } from './common';

type CSSStyle = Omit<Partial<CSSStyleDeclaration>, 'opacity' | 'fontWeight' | 'lineHeight'> & {
  /**
   * @title 透明度
   */
  opacity?: number;
  /**
   * @title 字体粗细程度
   */
  fontWeight?: string | number;
  /**
   * @title 行高
   */
  lineHeight?: string | number;
};

/**
 * @title 统计文本
 * @description 支持三种设置模式(优先级)：customHtml > formatter > content
 */
export type StatisticText = {
  /**
   * @title 统计文本的样式
   */
  readonly style?: CSSStyle | ((datum: Datum) => CSSStyle);
  /**
   * @title 文本内容
   */
  readonly content?: string;
  /**
   * @title 文本的格式化
   */
  readonly formatter?: (datum?: Datum, data?: Data /** filterData */) => string;
  /**
   * @title 自定义中心文本的 html
   */
  readonly customHtml?: (container: HTMLElement, view: View, datum?: Datum, data?: Data /** filterData */) => string;
  /**
   * @title 旋转弧度
   */
  readonly rotate?: number;
  /**
   * @title 横轴偏移值
   */
  readonly offsetX?: number;
  /**
   * @title 纵轴偏移值
   */
  readonly offsetY?: number;
};

/**
 * 中心文本的统计信息，统一一个数据结构
 */
export type Statistic = {
  /**
   * @title 标题
   */
  readonly title?: false | StatisticText;
  /**
   * @title 内容
   */
  readonly content?: false | StatisticText;
};
