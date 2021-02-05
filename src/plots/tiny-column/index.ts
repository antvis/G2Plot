import { Adaptor } from '../../core/adaptor';
import { Plot } from '../../core/plot';
import { getTinyData } from '../tiny-line/utils';
import { adaptor, meta } from './adaptor';
import { DEFAULT_TOOLTIP_OPTIONS } from './constants';
import { TinyColumnOptions } from './types';

export { TinyColumnOptions };

export class TinyColumn extends Plot<TinyColumnOptions> {
  /** 图表类型 */
  public type: string = 'tiny-column';

  /**
   * @override
   * @param data
   */
  public changeData(data: TinyColumnOptions['data']) {
    this.updateOption({ data });
    const { chart, options } = this;
    meta({ chart, options });
    chart.changeData(getTinyData(data));
  }

  protected getDefaultOptions() {
    return {
      appendPadding: 2,
      tooltip: {
        ...DEFAULT_TOOLTIP_OPTIONS,
      },
      animation: true,
    };
  }

  /**
   * 获取 迷你柱形图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<TinyColumnOptions> {
    return adaptor;
  }
}
