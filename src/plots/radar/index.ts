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
    return {
      xAxis: {
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              lineDash: null,
            },
          },
        },
      },
      yAxis: {
        line: null,
        tickLine: null,
        grid: {
          line: {
            type: 'line',
            style: {
              lineDash: null,
            },
          },
        },
      },
    };
  }

  /**
   * 获取 雷达图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<RadarOptions> {
    return adaptor;
  }
}
