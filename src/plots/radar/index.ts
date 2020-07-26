import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { RadarOptions } from './types';
import { adaptor } from './adaptor';

export { RadarOptions };

export class Radar extends Plot<RadarOptions> {
  /** 图表类型 */
  public type: string = 'radar';

  /**
   * 获取 雷达图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<RadarOptions> {
    return adaptor;
  }
}
