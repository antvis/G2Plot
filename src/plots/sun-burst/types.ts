import { Options, StyleAttr } from '../../types';

export interface SunBurstOptions extends Omit<Options, 'data' | 'legend' | 'slider' | 'scrollbar' | 'xAxis' | 'yAxis'> {
  /** 旭日图数据 */
  readonly data: any;
  /** 布局类型 */
  readonly type?: string;
  /** 分组字段 */
  readonly seriesField?: string;
  /** 排序类型 */
  readonly reflect?: 'x' | 'y';
  /** 内径 */
  readonly innerRadius?: number;
  /** 颜色映射 */
  readonly colorField?: string;
  /** 旭日图形样式 */
  readonly sunBurstStyle?: StyleAttr | (() => StyleAttr);
}
