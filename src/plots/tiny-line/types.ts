import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';
import { TinyTooltipOption } from '../../types/tooltip';

/** mini 图类型定义需要 omit 很多的 G2 Options 配置 */
export interface TinyLineOptions extends Omit<Options, 'data' | 'tooltip' | 'legend' | 'label'> {
  /** 具体的数据 */
  readonly data: number[];
  /** 是否平滑 */
  readonly smooth?: boolean;
  /** 是否连接空数据 */
  readonly connectNulls?: boolean;
  /** 折线extra图形样式 */
  readonly lineStyle?: ShapeStyle | ((x?: number, y?: number) => ShapeStyle);
  /** tooltip配置 */
  readonly tooltip?: boolean | TinyTooltipOption;
}
