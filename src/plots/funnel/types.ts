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
  /** 对比字段 */
  readonly compareField?: string;
  /** 是否转置 */
  readonly isTransposed?: boolean;
  /** 是否是动态高度 */
  readonly dynamicHeight?: boolean;
  /** 转化率信息 */
  readonly conversionTag?:
    | false
    | {
        readonly offsetX: number;
        readonly offsetY: number;
        readonly style: TextStyle;
        readonly formatter: string | ((datum?: Datum, data?: Data) => string);
      };
}
