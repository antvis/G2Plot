import { Options, StyleAttr } from '../../types';

export interface HistogramOptions extends Options {
  /**
   * @title 直方图绘制字段
   * @description   设置直方图绘制 (进行分箱) 的字段
   */
  readonly binField: string;

  /**
   * @title 设置直方图的分箱宽度
   * @description   binWidth 影响直方图分成多少箱,不能与binNumber一起使用
   */
  readonly binWidth?: number;
  /**
   * @title 设置直方图的分箱数量
   * @description   binNumber 影响直方图分箱后每个柱子的宽度
   */
  readonly binNumber?: number;
  /**
   * @title 指定层叠字段
   * @description   通过该字段的值，柱子将会被分割为多个部分，通过颜色进行区分
   */
  readonly stackField?: string;
  /**
   * @title 柱子样式配置
   */
  readonly columnStyle?: StyleAttr;
}
