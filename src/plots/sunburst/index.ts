import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { SunburstOptions } from './types';
import { adaptor } from './adaptor';
import { DEFAULT_OPTIONS } from './constant';

export type { SunburstOptions };

export class Sunburst extends Plot<SunburstOptions> {
  /**
   * 获取 旭日图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<SunburstOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'sunburst';

  /**
   * 获取 旭日图 默认配置
   */
  protected getDefaultOptions() {
    return Sunburst.getDefaultOptions();
  }

  /**
   * 获取旭日图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<SunburstOptions> {
    return adaptor;
  }
}
