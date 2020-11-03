import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { deepAssign } from '../../utils';
import { HeatmapOptions } from './types';
import { adaptor } from './adaptor';
// registered shapes
import './shapes/circle';
import './shapes/square';

export { HeatmapOptions };

export class Heatmap extends Plot<HeatmapOptions> {
  /** 图表类型 */
  public type: string = 'heatmap';

  /**
   * 获取直方图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<HeatmapOptions> {
    return adaptor;
  }

  protected getDefaultOptions() {
    return deepAssign({}, super.getDefaultOptions(), {
      type: 'polygon',
      legend: false,
      xAxis: {
        tickLine: null,
        line: null,
        grid: {
          alignTick: false,
          line: {
            style: {
              lineWidth: 1,
              lineDash: null,
              stroke: '#f0f0f0',
            },
          },
        },
      },
      yAxis: {
        grid: {
          alignTick: false,
          line: {
            style: {
              lineWidth: 1,
              lineDash: null,
              stroke: '#f0f0f0',
            },
          },
        },
      },
    });
  }
}
