import { StyleAttr } from '../../types/attr';
import { TextStyle, Datum, Data, AnnotationPosition, Options } from '../../types/common';

export type ConversionPosition = {
  start: AnnotationPosition;
  end: AnnotationPosition;
};

export interface FunnelOptions extends Options {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
  /** 分组字段: 漏斗图将根据此字段转置为分面漏斗图 */
  readonly seriesField?: string;
  /** 对比字段：漏斗图将根据此字段转置为对比漏斗图  */
  readonly compareField?: string;
  /** 是否转置 */
  readonly isTransposed?: boolean;
  /** 是否是动态高度 */
  readonly dynamicHeight?: boolean;
  /** maxSize: 最大宽度，0-1 之间 */
  readonly maxSize?: number;
  /** minSize: 最大宽度，0-1 之间 */
  readonly minSize?: number;

  // 样式
  /** shape 形状: pyramid 金字塔, 只在基础漏斗图中适用. 在对比漏斗图以及设置 dynamicHeight: 'true' 时不适用 */
  readonly shape?: string;
  /** 漏斗图样式 */
  readonly funnelStyle?: StyleAttr;

  // 组件
  /** 转化率信息 */
  readonly conversionTag?:
    | false
    | {
        readonly offsetX?: number;
        readonly offsetY?: number;
        readonly style?: TextStyle;
        readonly formatter?: string | ((datum?: Datum, data?: Data) => string);
      };
}
