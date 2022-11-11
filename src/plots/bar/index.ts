import { Adaptor } from '../../core/adaptor';
import { Plot } from '../../core/plot';
import { getDataWhetherPercentage } from '../../utils/transform/percent';
import { adaptor, meta } from './adaptor';
import { DEFAULT_OPTIONS } from './constants';
import { BarOptions } from './types';

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
    const { isPercent } = options;
    let { xField, yField, xAxis, yAxis } = options;
    [xField, yField] = [yField, xField];
    [xAxis, yAxis] = [yAxis, xAxis];
    const switchedFieldOptions = { ...options, xField, yField, yAxis, xAxis };
    meta({ chart, options: switchedFieldOptions });
    chart.changeData(getDataWhetherPercentage(data, xField, yField, xField, isPercent));
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
