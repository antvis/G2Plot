import { Options } from '../../types';

// adaptor 内部使用
export interface FunnelAdaptorOptions extends FunnelOptions {
  // formatData，较 data 多出百分比属性
  formatData?: Record<string, any>[];
}

export interface FunnelOptions extends Options {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
  /** 对比字段 */
  readonly compareField?: string;
  /** 是否转置 */
  readonly transpose?: boolean;
  /** 是否是动态高度 */
  readonly dynamicHeight?: boolean;
  /** annotation 文本 */
  readonly annotation?: false | string | ((...args: any[]) => string);
}
