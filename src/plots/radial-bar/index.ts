import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { RadialBarOptions } from './types';
import { adaptor } from './adaptor';

export { RadialBarOptions };

/**
 * 玉珏图
 */
export class RadialBar extends Plot<RadialBarOptions> {
  /** 图表类型 */
  public type: string = 'radial-bar';

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<RadialBarOptions> {
    return adaptor;
  }
}
