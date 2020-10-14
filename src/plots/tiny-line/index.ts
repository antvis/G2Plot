import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { TinyLineOptions } from './types';
import { adaptor } from './adaptor';
import { DEFAULT_TOOLTIP_OPTIONS } from './constants';

export { TinyLineOptions };

export class TinyLine extends Plot<TinyLineOptions> {
  /** 图表类型 */
  public type: string = 'tiny-line';

  protected getDefaultOptions() {
    return {
      appendPadding: 2,
      tooltip: {
        ...DEFAULT_TOOLTIP_OPTIONS,
      },
    };
  }

  /**
   * 获取 迷你折线图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<TinyLineOptions> {
    return adaptor;
  }
}
