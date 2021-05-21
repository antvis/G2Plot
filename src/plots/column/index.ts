import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { getDataWhetherPecentage } from '../../utils/transform/percent';
import { ColumnOptions } from './types';
import { adaptor, meta } from './adaptor';
import { DEFAULT_OPTIONS } from './constants';

export type { ColumnOptions };

/**
 * 柱形图
 */
export class Column extends Plot<ColumnOptions> {
  /**
   * 获取 柱形图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<ColumnOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public readonly type: string = 'column';

  /**
   * @override
   */
  public changeData(data: ColumnOptions['data']) {
    this.updateOption({ data });
    const { yField, xField, isPercent } = this.options;
    const { chart, options } = this;
    meta({ chart, options });
    this.chart.changeData(getDataWhetherPecentage(data, yField, xField, yField, isPercent));
  }

  /**
   * 获取 柱形图 默认配置
   */
  protected getDefaultOptions() {
    return Column.getDefaultOptions();
  }

  /**
   * 获取 柱形图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<ColumnOptions> {
    return adaptor;
  }
}
