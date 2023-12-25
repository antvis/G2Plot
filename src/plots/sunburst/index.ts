import { Plot } from '../../base';

import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import type { SunburstOptions } from './type';

export type { SunburstOptions };

export class Sunburst extends Plot<SunburstOptions> {
  /** 图表类型 */
  public type = 'Sunburst';

  /**
   * 获取 旭日图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<SunburstOptions> {
    return { type: 'view', children: [{ type: 'sunburst' }] };
  }

  /**
   * 获取 旭日图 默认配置
   */
  protected getDefaultOptions() {
    return Sunburst.getDefaultOptions();
  }

  /**
   * 旭日图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<SunburstOptions>) => void {
    return adaptor;
  }
}
