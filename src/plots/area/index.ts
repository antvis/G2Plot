import { Adaptor } from '../../core/adaptor';
import { Plot } from '../../core/plot';
import { getDataWhetherPercentage } from '../../utils/transform/percent';
import { adaptor, meta } from './adaptor';
import { DEFAULT_OPTIONS } from './constants';
import { AreaOptions } from './types';

export type { AreaOptions };

export class Area extends Plot<AreaOptions> {
  /**
   * 获取 面积图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<AreaOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'area';

  /**
   * 获取 面积图 默认配置
   */
  protected getDefaultOptions() {
    return Area.getDefaultOptions();
  }

  /**
   * @override
   * @param data
   */
  public changeData(data: AreaOptions['data']) {
    this.updateOption({ data });
    const { isPercent, xField, yField } = this.options;
    const { chart, options } = this;
    meta({ chart, options });
    this.chart.changeData(getDataWhetherPercentage(data, yField, xField, yField, isPercent));
  }

  /**
   * 获取 面积图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<AreaOptions> {
    return adaptor;
  }
}
