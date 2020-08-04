import { Plot } from '../../core/plot';
import { BiaxOption } from './types';
import { adaptor } from './adaptor';
import { Adaptor } from '../../core/adaptor';

export { BiaxOption };

export class Biax extends Plot<BiaxOption> {
  /** 图表类型: 双轴图 */
  public type: string = 'biax';

  /**
   * 获取双轴图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<BiaxOption> {
    return adaptor;
  }
}
