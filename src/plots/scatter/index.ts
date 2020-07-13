import { Plot } from '../../core/plot';
import { ScatterOptions } from './types';
import { ScatterAdaptor } from './adaptor';
import { Adaptor } from '../../core/adaptor';

export { ScatterOptions };

export class Scatter extends Plot<ScatterOptions> {
  /** 图表类型 */
  public type: string = 'point';

  /**
   * 获取散点图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<ScatterOptions> {
    return new ScatterAdaptor();
  }
}
