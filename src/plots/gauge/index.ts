import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { GaugeOptions } from './types';
import { adaptor } from './adaptor';

export { GaugeOptions };

/**
 * 仪表盘盘
 */
export class Gauge extends Plot<GaugeOptions> {
  /** 图表类型 */
  public type: string = 'gauge';

  protected getDefaultOptions() {
    return {
      percent: 0,
      range: [0, 0.25, 0.5, 0.75, 1],
      startAngle: -7 / 6,
      endAngle: 1 / 6,
      syncViewPadding: true,
    };
  }

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<GaugeOptions> {
    return adaptor;
  }
}
