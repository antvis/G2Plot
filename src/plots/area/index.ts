import { deepMix } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { AreaOptions } from './types';
import { adaptor } from './adaptor';

export { AreaOptions };

export class Area extends Plot<AreaOptions> {
  /** 图表类型 */
  public type: string = 'area';

  /**
   * 获取 折线图 默认配置
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
   * 获取 面积图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<AreaOptions> {
    return adaptor;
  }
}
