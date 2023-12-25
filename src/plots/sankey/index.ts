import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { SankeyOptions } from './type';

export type { SankeyOptions };

export class Sankey extends Plot<SankeyOptions> {
  /** 图表类型 */
  public type = 'sankey';

  /**
   * 获取 双轴图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<SankeyOptions> {
    return { type: 'view', children: [{ type: 'sankey' }] };
  }

  /**
   * 获取 条形图 默认配置
   */
  protected getDefaultOptions() {
    return Sankey.getDefaultOptions();
  }

  /**
   * 条形图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<SankeyOptions>) => void {
    return adaptor;
  }
}
