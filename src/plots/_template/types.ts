import { Options } from '../../types';

/** 配置类型定义 */
export interface TemplateOptions extends Options {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
}
