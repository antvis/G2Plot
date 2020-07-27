import { ChartOptions } from '../../types';
import { ShapeStyle } from '../../types/style';

/** mini 图的配置继承自 ChartOptions，因为很多的 G2 图形配置都不需要 */
export interface TinyColumnOptions extends ChartOptions {
  // 通用数据配置
  /** 具体的数据 */
  readonly data: number[];
  /** 数据字段元信息 */
  readonly meta?: Record<string, any>;
  /** 迷你柱形图形样式 */
  readonly columnStyle?: ShapeStyle | ((x?: number, y?: number) => ShapeStyle);
  /** tooltip配置 */
  readonly tooltip?:
    | boolean
    | {
        formatter?: (x, y) => string;
        domStyles?: object;
        position?: 'top' | 'bottom' | 'left' | 'right';
        offset?: number;
        showCrosshairs?: boolean;
      };
}
