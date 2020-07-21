import { ChartOptions } from '../../types';
import { ShapeStyle } from '../../types/style';

/** mini 图的配置继承自 ChartOptions，因为很多的 G2 图形配置都不需要 */
export interface TinyAreaOptions extends ChartOptions {
  // 通用数据配置
  /** 具体的数据 */
  readonly data: number[];
  /** 数据字段元信息 */
  readonly meta?: Record<string, any>;
  /** 面积图颜色 */
  readonly color?: string;
  /** 是否平滑 */
  readonly smooth?: boolean;
  /** 是否连接空数据 */
  readonly connectNulls?: boolean;
  /** 面积extra图形样式 */
  readonly lineStyle?: ShapeStyle | ((x?: number, y?: number) => ShapeStyle);
}
