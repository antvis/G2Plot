import { Options } from '../../types';

export interface ScatterOptions extends Options {
  /** x 轴字段 */
  readonly xField: string;

  /** y 轴字段 */
  readonly yField: string;

  /** 分组字段 */
  readonly seriesField?: string;

  /** 散点图大小 */
  readonly symbolSize?: number | [number, number] | ((value: number) => number);

  /** 散点图形状 */
  readonly shape?: string[] | ((item: any[]) => string | string[]);
}
