import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { deepAssign } from '../../utils';
import { ScatterOptions } from './types';
import { adaptor } from './adaptor';
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
    return deepAssign({}, super.getDefaultOptions(), {
      size: 4,
      tooltip: {
        showTitle: false,
        showMarkers: false,
        showCrosshairs: true,
        crosshairs: {
          type: 'xy',
        },
      },
    });
  }
}
