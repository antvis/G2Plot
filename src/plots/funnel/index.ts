import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { FunnelOptions } from './types';
import { adaptor } from './adaptor';
import {
  DEFAULT_OPTIONS,
  FUNNEL_CONVERSATION as FUNNEL_CONVERSATION_FIELD,
  FUNNEL_PERCENT,
  FUNNEL_TOTAL_PERCENT,
} from './constant';

export type { FunnelOptions };

export { FUNNEL_CONVERSATION_FIELD };

export class Funnel extends Plot<FunnelOptions> {
  /** 图表类型 */
  public type: string = 'funnel';

  static getDefaultOptions(): Partial<FunnelOptions> {
    return DEFAULT_OPTIONS;
  }

  // 内部变量
  /** 漏斗 转化率 字段 */
  static CONVERSATION_FIELD = FUNNEL_CONVERSATION_FIELD;
  /** 漏斗 百分比 字段 */
  static PERCENT_FIELD = FUNNEL_PERCENT;
  /** 漏斗 总转换率百分比 字段 */
  static TOTAL_PERCENT_FIELD = FUNNEL_TOTAL_PERCENT;

  /**
   * 获取 漏斗图 默认配置项
   */
  protected getDefaultOptions(): Partial<FunnelOptions> {
    // 由于不同漏斗图 defaultOption 有部分逻辑不同，此处仅处理 core.getDefaultOptions 覆盖范围，funnel 的 defaulOption 为不分散逻辑统一写到 adaptor 的 defaultOption 中
    return Funnel.getDefaultOptions();
  }

  /**
   * 获取 漏斗图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<FunnelOptions> {
    return adaptor;
  }
}
