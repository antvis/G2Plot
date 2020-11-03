import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { MultiLayerOptions } from './types';
import { adaptor } from './adaptor';

export { MultiLayerOptions };

/**
 * 多图层图形，释放 G2 80% 的功能
 */
export class MultiLayer extends Plot<MultiLayerOptions> {
  /** 图表类型 */
  public type: string = 'multi-layer';

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<MultiLayerOptions> {
    return adaptor;
  }
}
