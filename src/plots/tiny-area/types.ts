import { ChartOptions } from '../../types';
import { ShapeStyle } from '../../types/style';
import { TinyTooltipOption } from '../../types/tooltip';

/** mini 图的配置继承自 ChartOptions，因为很多的 G2 图形配置都不需要 */
export interface TinyAreaOptions extends ChartOptions {
  // 通用数据配置
  /** 具体的数据 */
  readonly data: number[];
  /** 数据字段元信息 */
  readonly meta?: Record<string, any>;
  /** 是否平滑 */
  readonly smooth?: boolean;
  /** 面积折线图形样式 */
  readonly lineStyle?: ShapeStyle | ((x?: number, y?: number) => ShapeStyle);
  /** 面积填充图形样式 */
  readonly areaStyle?: ShapeStyle | ((x?: number, y?: number) => ShapeStyle);
  /** tooltip配置 */
  readonly tooltip?: boolean | TinyTooltipOption;
}
