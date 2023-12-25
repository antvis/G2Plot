import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { GaugeOptions } from './type';

export type { GaugeOptions };

export class Gauge extends Plot<GaugeOptions> {
  /** 图表类型 */
  public type = 'Gauge';

  /**
   * 获取 仪表盘 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<GaugeOptions> {
    return {
      type: 'view',
      legend: false,
      children: [{ type: 'gauge' }],
    };
  }

  /**
   * 获取 仪表盘 默认配置
   */
  protected getDefaultOptions() {
    return Gauge.getDefaultOptions();
  }

  /**
   * 仪表盘适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<GaugeOptions>) => void {
    return adaptor;
  }
}
