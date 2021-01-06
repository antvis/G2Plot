import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { TinyLineOptions } from './types';
import { adaptor } from './adaptor';
import { DEFAULT_TOOLTIP_OPTIONS } from './constants';
import { getTinyData } from './utils';

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

  /**
   * @override
   * @param data
   */
  public changeData(data: TinyLineOptions['data']) {
    this.updateOption({ data });
    this.chart.changeData(getTinyData(data));
  }
}
