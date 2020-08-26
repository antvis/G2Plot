import { deepMix } from '@antv/util';
import { Plot } from '../../core/plot';
import { RoseOptions } from './types';
import { adaptor } from './adaptor';
import { Adaptor } from '../../core/adaptor';

export { RoseOptions };

export class Rose extends Plot<RoseOptions> {
  /** 玫瑰图 */
  public type: string = 'rose';

  /**
   * 获取默认的 options 配置项
   */
  protected getDefaultOptions(): Partial<RoseOptions> {
    return deepMix({}, super.getDefaultOptions(), {
      tooltip: {
        showMarkers: false,
        showCrosshairs: false,
      },
      xAxis: false,
      yAxis: false,
      legend: {
        position: 'right',
        offsetX: -10,
      },
      sectorStyle: {
        stroke: '#fff',
        lineWidth: 1,
      },
    });
  }

  /**
   * 获取 玫瑰图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<RoseOptions> {
    return adaptor;
  }
}
