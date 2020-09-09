import { Options, StyleAttr, ShapeStyle } from '../../types';
import { TinyTooltipOption } from '../../types/tooltip';

/** mini 图类型定义需要 omit 很多的 G2 Options 配置 */
export interface TinyAreaOptions extends Omit<Options, 'data' | 'tooltip' | 'legend' | 'label'> {
  /** 具体的数据 */
  readonly data: number[];
  /** 是否平滑 */
  readonly smooth?: boolean;
  /** 面积折线图形样式 */
  readonly lineStyle?: (...args: any[]) => ShapeStyle;
  /** 面积填充图形样式 */
  readonly areaStyle?: (...args: any[]) => ShapeStyle;
  /** tooltip配置 */
  readonly tooltip?: boolean | TinyTooltipOption;
}
