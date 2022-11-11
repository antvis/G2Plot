import { Adaptor } from '../../core/adaptor';
import { Plot } from '../../core/plot';
import { adaptor } from './adaptor';
import { DEFAULT_OPTIONS } from './constant';
import { StockOptions } from './types';
import { getStockData } from './utils';

export type { StockOptions };

export class Stock extends Plot<StockOptions> {
  /**
   * 获取 散点图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<StockOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'stock';

  /**
   * 默认配置
   *  g2/g2plot默 认 配 置 -->  图 表 默 认 配 置  --> 开 发 者 自 定 义 配 置  --> 最 终 绘 图 配 置
   */
  protected getDefaultOptions(): Partial<StockOptions> {
    return Stock.getDefaultOptions();
  }

  /**
   * 获取 蜡烛图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<StockOptions> {
    return adaptor;
  }

  /**
   * @override
   * @param data
   */
  public changeData(data: StockOptions['data']) {
    this.updateOption({ data });
    const { yField } = this.options;
    this.chart.changeData(getStockData(data, yField));
  }
}
