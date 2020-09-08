import { deepMix } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { RadarOptions } from './types';
import { adaptor } from './adaptor';
import './interaction';

export { RadarOptions };

export class Radar extends Plot<RadarOptions> {
  /** 图表类型 */
  public type: string = 'radar';

  /**
   * 获取 雷达图 默认配置
   */
  protected getDefaultOptions(): Partial<RadarOptions> {
    return deepMix({}, super.getDefaultOptions(), {
      xAxis: {
        label: {
          offset: 15,
        },
        grid: {
          line: {
            type: 'line',
          },
        },
      },
      yAxis: {
        grid: {
          line: {
            type: 'circle',
          },
        },
      },
      tooltip: {
        shared: true,
        showCrosshairs: true,
        showMarkers: true,
        crosshairs: {
          type: 'xy',
          line: {
            style: {
              stroke: '#565656',
              lineDash: [4],
            },
          },
          follow: true,
        },
      },
    });
  }

  /**
   * 获取 雷达图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<RadarOptions> {
    return adaptor;
  }
}
