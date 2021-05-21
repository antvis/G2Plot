import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { ViolinOptions } from './types';
import { adaptor } from './adaptor';
import { DEFAULT_OPTIONS } from './constant';
import { transformViolinData } from './utils';
export type { ViolinOptions };

export class Violin extends Plot<ViolinOptions> {
  /**
   * 获取 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<ViolinOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'violin';

  /**
   * @override
   */
  public changeData(data: ViolinOptions['data']) {
    this.updateOption({ data });
    this.chart.changeData(transformViolinData(this.options));
  }

  /**
   * 获取 小提琴图 默认配置项
   */
  protected getDefaultOptions(): Partial<ViolinOptions> {
    return Violin.getDefaultOptions();
  }

  /**
   * 获取 小提琴图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<ViolinOptions> {
    return adaptor;
  }
}
