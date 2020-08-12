import { deepMix } from '@antv/util';
import { Plot } from '../../core/plot';
import { ScatterOptions } from './types';
import { adaptor } from './adaptor';
import { Adaptor } from '../../core/adaptor';
import './interaction';

export { ScatterOptions };

export class Scatter extends Plot<ScatterOptions> {
  /** 图表类型 */
  public type: string = 'point';

  /**
   * 获取散点图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<ScatterOptions> {
    return adaptor;
  }

  protected getDefaultOptions() {
    return deepMix({}, super.getDefaultOptions(), {
      size: 4,
      pointStyle: {
        lineWidth: 1,
        strokeOpacity: 1,
        fillOpacity: 0.95,
        stroke: '#fff',
      },
      tooltip: {
        shared: null,
        showTitle: false,
        showMarkers: false,
        showCrosshairs: false,
      },
      shape: 'circle',
    });
  }
}
