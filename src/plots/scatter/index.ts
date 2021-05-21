import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { deepAssign } from '../../utils';
import { ScatterOptions } from './types';
import { adaptor, transformOptions, meta } from './adaptor';
import { DEFAULT_OPTIONS } from './constant';
import './interaction';

export type { ScatterOptions };

export class Scatter extends Plot<ScatterOptions> {
  /**
   * 获取 散点图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<ScatterOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'point';

  /**
   * @override
   * @param data
   */
  public changeData(data: ScatterOptions['data']) {
    this.updateOption(transformOptions(deepAssign({}, this.options, { data })));
    const { options, chart } = this;
    meta({ chart, options });
    this.chart.changeData(data);
  }

  /**
   * 获取 散点图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<ScatterOptions> {
    return adaptor;
  }

  protected getDefaultOptions() {
    return Scatter.getDefaultOptions();
  }
}
