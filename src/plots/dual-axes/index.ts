import { deepMix } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { DualAxesOption } from './types';
import { adaptor } from './adaptor';

export { DualAxesOption };

export class DualAxes extends Plot<DualAxesOption> {
  /** 图表类型: 双轴图 */
  public type: string = 'dual-axes';

  /**
   * 获取 双轴图 默认配置
   */
  protected getDefaultOptions() {
    return deepMix({}, super.getDefaultOptions(), {
      tooltip: {
        showMarkers: true,
        showCrosshairs: true,
        crosshairs: {
          type: 'x',
        },
      },
    });
  }

  /**
   * 获取双轴图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<DualAxesOption> {
    return adaptor;
  }
}
