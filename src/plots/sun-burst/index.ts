import { deepMix } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { SunBurstOptions } from './types';
import { adaptor } from './adaptor';

export { SunBurstOptions };

export class SunBurst extends Plot<SunBurstOptions> {
  /** 图表类型 */
  public type: string = 'sun-burst';

  /**
   * 获取旭日图默认配置
   */
  protected getDefaultOptions() {
    return deepMix({}, super.getDefaultOptions(), {
      type: 'partition',
      innerRadius: 0,
      seriesField: 'value',
      tooltip: {
        showTitle: false,
        showMarkers: false,
      },
    });
  }

  /**
   * 获取旭日图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<SunBurstOptions> {
    return adaptor;
  }
}
