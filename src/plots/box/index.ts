import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { BoxOptions } from './types';
import { adaptor } from './adaptor';

export { BoxOptions };

export class Box extends Plot<BoxOptions> {
  /** 图表类型 */
  public type: string = 'box';

  /**
   * 获取直方图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<BoxOptions> {
    return adaptor;
  }
}
