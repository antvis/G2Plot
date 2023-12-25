import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { DefaultTransformKey, VennOptions } from './type';

export type { VennOptions };

export class Venn extends Plot<VennOptions> {
  /** 图表类型 */
  public type = 'venn';

  /**
   * 获取 韦恩图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<VennOptions> {
    return {
      type: 'view',
      children: [{ type: 'path' }],
      legend: {
        color: { itemMarker: 'circle' },
      },
      encode: { color: DefaultTransformKey.color, d: DefaultTransformKey.d },
    };
  }

  /**
   * 获取 韦恩图 默认配置
   */
  protected getDefaultOptions() {
    return Venn.getDefaultOptions();
  }

  /**
   * 韦恩图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<VennOptions>) => void {
    return adaptor;
  }
}
