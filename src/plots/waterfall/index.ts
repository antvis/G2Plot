import { Adaptor } from '../../core/adaptor';
import { Plot } from '../../core/plot';
import { adaptor } from './adaptor';
import { DEFAULT_OPTIONS } from './constant';
import { WaterfallOptions } from './types';
import { transformData } from './utils';

export type { WaterfallOptions };

/**
 * 瀑布图
 */
export class Waterfall extends Plot<WaterfallOptions> {
  /**
   * 获取 瀑布图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<WaterfallOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public readonly type: string = 'waterfall';

  /**
   * @override
   * @param data
   */
  public changeData(data) {
    const { xField, yField, total } = this.options;
    this.updateOption({ data });
    this.chart.changeData(transformData(data, xField, yField, total));
  }

  /**
   * 获取 瀑布图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<WaterfallOptions> {
    return adaptor;
  }

  /**
   * 获取 瀑布图 的默认配置
   */
  protected getDefaultOptions(): Partial<WaterfallOptions> {
    return Waterfall.getDefaultOptions();
  }
}
