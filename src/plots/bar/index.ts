import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { getDataWhetherPecentage } from '../../utils/transform/percent';
import { BarOptions } from './types';
import { adaptor, meta } from './adaptor';
import { DEFAULT_OPTIONS } from './constants';
import { transformBarData } from './utils';

export type { BarOptions };

/**
 * 条形图
 */
export class Bar extends Plot<BarOptions> {
  /**
   * 获取 条形图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<BarOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public readonly type: string = 'bar';

  /**
   * @override
   */
  public changeData(data: BarOptions['data']) {
    this.updateOption({ data });
    const { chart, options } = this;
    const { xField, yField, isPercent } = options;
    const switchedFieldOptions = { ...options, xField: yField, yField: xField };
    meta({ chart, options: switchedFieldOptions });
    chart.changeData(getDataWhetherPecentage(transformBarData(data), xField, yField, xField, isPercent));
  }

  /**
   * 获取 条形图 默认配置
   */
  protected getDefaultOptions() {
    return Bar.getDefaultOptions();
  }

  /**
   * 获取 条形图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<BarOptions> {
    return adaptor;
  }
}
