import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { DEFAULT_TOOLTIP_OPTIONS } from '../tiny-line/constants';
import { getTinyData } from '../tiny-line/utils';
import { TinyAreaOptions } from './types';
import { adaptor } from './adaptor';

export { TinyAreaOptions };

export class TinyArea extends Plot<TinyAreaOptions> {
  /** 图表类型 */
  public type: string = 'tiny-area';

  protected getDefaultOptions() {
    return {
      appendPadding: 2,
      tooltip: {
        ...DEFAULT_TOOLTIP_OPTIONS,
      },
      // 默认样式
      color: 'l(90) 0:#E5EDFE 1:#ffffff',
      areaStyle: {
        fillOpacity: 0.6,
      },
      line: {
        size: 1,
        color: '#5B8FF9',
      },
    };
  }

  /**
   * 获取 迷你面积图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<TinyAreaOptions> {
    return adaptor;
  }

  /**
   * @override
   * @param data
   */
  public changeData(data: TinyAreaOptions['data']) {
    this.updateOption({ data });
    return this.chart.changeData(getTinyData(data));
  }
}
