import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { CirclePackingOptions } from './types';
import { adaptor } from './adaptor';
import { DEFAULT_OPTIONS } from './constant';

export type { CirclePackingOptions };

/**
 *  CirclePacking
 * @usage hierarchy, proportions
 */
export class CirclePacking extends Plot<CirclePackingOptions> {
  /**
   * 获取 面积图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<CirclePackingOptions> {
    return DEFAULT_OPTIONS;
  }
  /** 图表类型 */
  public type: string = 'circlePacking';

  protected getDefaultOptions() {
    return CirclePacking.getDefaultOptions();
  }

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<CirclePackingOptions> {
    return adaptor;
  }
}
