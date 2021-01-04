import { isArray, map } from '@antv/util';
import { deepAssign } from '../../utils';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { StockOptions } from './types';
import { adaptor } from './adaptor';

import { DEFAULT_TOOLTIP_OPTIONS, TREND_FIELD, TREND_DOWN, TREND_UP, Y_FIELD } from './constant';

export { StockOptions };

export class Stock extends Plot<StockOptions> {
  /** 图表类型 */
  public type: string = 'stock';

  /**
   * 默认配置
   *  g2/g2plot默 认 配 置 -->  图 表 默 认 配 置  --> 开 发 者 自 定 义 配 置  --> 最 终 绘 图 配 置
   */
  protected getDefaultOptions(): Partial<StockOptions> {
    return deepAssign({}, super.getDefaultOptions(), {
      // 设置默认图表 tooltips
      tooltip: DEFAULT_TOOLTIP_OPTIONS,
      interactions: [{ type: 'tooltip' }],
      legend: {
        position: 'top-left',
      },
    });
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
    const newData = map(data, (obj) => {
      if (isArray(yField)) {
        const [open, close, high, low] = yField;
        obj[TREND_FIELD] = obj[open] <= obj[close] ? TREND_UP : TREND_DOWN;
        obj[Y_FIELD] = [obj[open], obj[close], obj[high], obj[low]];
      }
      return obj;
    });

    this.chart.changeData(newData);
  }
}
