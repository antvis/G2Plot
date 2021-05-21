import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { RoseOptions } from './types';
import { adaptor } from './adaptor';
import { DEFAULT_OPTIONS } from './constant';

export type { RoseOptions };

export class Rose extends Plot<RoseOptions> {
  /**
   * 获取 玫瑰图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<RoseOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 玫瑰图 */
  public type: string = 'rose';

  /**
   * @override
   * @param data
   */
  public changeData(data) {
    this.updateOption({ data });
    this.chart.changeData(data);
  }

  /**
   * 获取默认的 options 配置项
   */
  protected getDefaultOptions(): Partial<RoseOptions> {
    return Rose.getDefaultOptions();
  }

  /**
   * 获取 玫瑰图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<RoseOptions> {
    return adaptor;
  }
}
