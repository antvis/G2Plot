import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { Adaptor } from '../../core/adaptor';
import { RadarOptions } from './types';
import { adaptor } from './adaptor';
import './interactions';

export type { RadarOptions };

export class Radar extends Plot<RadarOptions> {
  /** 图表类型 */
  public type: string = 'radar';

  /**
   * @override
   * @param data
   */
  public changeData(data) {
    this.updateOption({ data });
    this.chart.changeData(data);
  }

  /**
   * 获取 雷达图 默认配置
   */
  protected getDefaultOptions(): Partial<RadarOptions> {
    return deepAssign({}, super.getDefaultOptions(), {
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
      legend: {
        position: 'top',
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
