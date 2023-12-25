import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { TinyAreaOptions } from './type';

export type { TinyAreaOptions };

export class TinyArea extends Plot<TinyAreaOptions> {
  /** 图表类型 */
  public type = 'TinyArea';

  /**
   * 获取 面积图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<TinyAreaOptions> {
    return {
      type: 'view',
      animate: {
        enter: { type: 'growInX', duration: 500 },
      },
      children: [{ type: 'area', axis: false }],
      autoFit: false,
      padding: 0,
      margin: 0,
      tooltip: false,
    };
  }

  /**
   * 获取 面积图 默认配置
   */
  protected getDefaultOptions() {
    return TinyArea.getDefaultOptions();
  }

  /**
   * 面积图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<TinyAreaOptions>) => void {
    return adaptor;
  }
}
