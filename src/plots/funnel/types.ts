import { StyleAttr } from '../../types/attr';
import { AnnotationPosition, Data, Datum, Options, TextStyle } from '../../types/common';
export { Interaction } from '../../types';

export type ConversionPosition = {
  start: AnnotationPosition;
  end: AnnotationPosition;
};

export interface FunnelOptions extends Options {
  /**
   * @title x轴字段
   */
  readonly xField?: string;
  /**
   * @title y轴字段
   */
  readonly yField?: string;
  /**
   * @title 分组字段
   * @description 漏斗图将根据此字段转置为分面漏斗图
   */
  readonly seriesField?: string;
  /**
   * @title 对比字段
   * @description 漏斗图将根据此字段转置为对比漏斗图
   */
  readonly compareField?: string;
  /**
   * @title 是否转置
   * @default false
   */
  readonly isTransposed?: boolean;
  /**
   * @title 是否是动态高度
   * @default false
   */
  readonly dynamicHeight?: boolean;
  /**
   * @title 最大宽度
   * @description 范围0-1
   */
  readonly maxSize?: number;
  /**
   * @title 最小宽度
   * @description 范围0-1
   */
  readonly minSize?: number;
  /**
   * @title shape 形状
   * @description pyramid 金字塔, 只在基础漏斗图中适用. 在对比漏斗图以及设置 dynamicHeight: 'true' 时不适用
   */
  readonly shape?: string;
  /**
   * @title 漏斗图样式
   */
  readonly funnelStyle?: StyleAttr;
  /**
   * @title 漏斗分面标题
   * @description 是否关闭漏斗的标题展示，适用于存在多组漏斗的情形，如：分组漏斗图、对比漏斗图。
   */
  readonly showFacetTitle?: boolean;
  // 组件
  /**
   * @title 转化率信息
   */
  readonly conversionTag?:
    | false
    | {
        readonly offsetX?: number;
        readonly offsetY?: number;
        readonly style?: TextStyle;
        readonly formatter?: string | ((datum?: Datum, data?: Data) => string);
      };
}
