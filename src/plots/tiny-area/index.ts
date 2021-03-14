import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { getTinyData } from '../tiny-line/utils';
import { TinyAreaOptions } from './types';
import { adaptor, meta } from './adaptor';
import { DEFAULT_OPTIONS } from './constants';

export { TinyAreaOptions };

export class TinyArea extends Plot<TinyAreaOptions> {
  /**
   * 获取默认配置项
   * @static 供外部使用
   */
  static getDefaultOptions(): Partial<TinyAreaOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'tiny-area';

  /**
   * @override
   * @param data
   */
  public changeData(data: TinyAreaOptions['data']) {
    this.updateOption({ data });
    const { chart, options } = this;
    meta({ chart, options });
    chart.changeData(getTinyData(data));
  }

  protected getDefaultOptions() {
    return TinyArea.getDefaultOptions();
  }

  /**
   * 获取 迷你面积图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<TinyAreaOptions> {
    return adaptor;
  }
}
