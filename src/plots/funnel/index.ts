import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { FunnelOptions } from './types';
import { adaptor } from './adaptor';
import { FUNNEL_CONVERSATION as FUNNEL_CONVERSATION_FIELD } from './constant';

export type { FunnelOptions };

export { FUNNEL_CONVERSATION_FIELD };

export class Funnel extends Plot<FunnelOptions> {
  /** 图表类型 */
  public type: string = 'funnel';

  static getDefaultOptions(): Partial<FunnelOptions> {
    return {
      appendPadding: [0, 80],
    };
  }

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
