import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { BiDirectionalOptions } from './types';
import { adaptor } from './adaptor';

export { BiDirectionalOptions };

export class BiDirectional extends Plot<BiDirectionalOptions> {
  /** 图表类型 */
  public type: string = 'BiDirectional';

  /**
   * 获取直方图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<BiDirectionalOptions> {
    return adaptor;
  }
}
