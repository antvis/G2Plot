import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { DEFAULT_TOOLTIP_OPTIONS } from './constants';
import { TinyColumnOptions } from './types';
import { adaptor } from './adaptor';

export { TinyColumnOptions };

export class TinyColumn extends Plot<TinyColumnOptions> {
  /** 图表类型 */
  public type: string = 'tiny-column';

  protected getDefaultOptions() {
    return {
      appendPadding: 2,
      tooltip: {
        ...DEFAULT_TOOLTIP_OPTIONS,
      },
    };
  }

  /**
   * 获取 迷你柱形图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<TinyColumnOptions> {
    return adaptor;
  }
}
