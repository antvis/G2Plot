import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { DEFAULT_TOOLTIP_OPTIONS } from '../tiny-line/constants';
import { TinyAreaOptions } from './types';
import { adaptor } from './adaptor';

export { TinyAreaOptions };

export class TinyArea extends Plot<TinyAreaOptions> {
  /** 图表类型 */
  public type: string = 'tiny-area';

  protected getDefaultOptions() {
    return {
      tooltip: {
        ...DEFAULT_TOOLTIP_OPTIONS,
      },
    };
  }

  /**
   * 获取 迷你面积图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<TinyAreaOptions> {
    return adaptor;
  }
}
