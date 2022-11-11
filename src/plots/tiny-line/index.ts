import { Adaptor } from '../../core/adaptor';
import { Plot } from '../../core/plot';
import { adaptor, meta } from './adaptor';
import { DEFAULT_OPTIONS } from './constants';
import { TinyLineOptions } from './types';
import { getTinyData } from './utils';

export type { TinyLineOptions };

export class TinyLine extends Plot<TinyLineOptions> {
  /**
   * 获取默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<TinyLineOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'tiny-line';

  /**
   * @override
   * @param data
   */
  public changeData(data: TinyLineOptions['data']) {
    this.updateOption({ data });
    const { chart, options } = this;
    meta({ chart, options });
    chart.changeData(getTinyData(data));
  }

  protected getDefaultOptions() {
    return TinyLine.getDefaultOptions();
  }

  /**
   * 获取 迷你折线图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<TinyLineOptions> {
    return adaptor;
  }
}
