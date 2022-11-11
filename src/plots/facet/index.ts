import { Adaptor } from '../../core/adaptor';
import { Plot } from '../../core/plot';
import { adaptor } from './adaptor';
import { DEFAULT_OPTIONS } from './constant';
import { FacetOptions } from './types';

export type { FacetOptions };

export class Facet extends Plot<FacetOptions> {
  /**
   * 获取 分面图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<FacetOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'area';

  /**
   * 获取 分面图 默认配置
   */
  protected getDefaultOptions() {
    return Facet.getDefaultOptions();
  }

  /**
   * 获取 分面图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<FacetOptions> {
    return adaptor;
  }
}
