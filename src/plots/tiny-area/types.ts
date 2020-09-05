import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';
import { TinyTooltipOption } from '../../types/tooltip';

/** mini 图类型定义需要 omit 很多的 G2 Options 配置 */
export interface TinyAreaOptions extends Omit<Options, 'data'> {
  /** 具体的数据 */
  readonly data: number[];
  /** 是否平滑 */
  readonly smooth?: boolean;
  /** 面积折线图形样式 */
  readonly lineStyle?: ShapeStyle | (() => ShapeStyle);
  /** 面积填充图形样式 */
  readonly areaStyle?: ShapeStyle | (() => ShapeStyle);
  /** tooltip配置 */
  readonly tooltip?: boolean | TinyTooltipOption;
}
