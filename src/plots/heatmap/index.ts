import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { HeatmapOptions } from './type';

export type { HeatmapOptions };

export class Heatmap extends Plot<HeatmapOptions> {
  /** 图表类型 */
  public type = 'heatmap';

  static getDefaultOptions(): Partial<HeatmapOptions> {
    return {
      type: 'view',
      legend: null,
      tooltip: {
        valueFormatter: '~s',
      },
      axis: {
        y: {
          title: null,
          grid: true,
        },
        x: {
          title: null,
          grid: true,
        },
      },
      children: [
        {
          type: 'point',
          interaction: {
            elementHighlightByColor: {
              background: true,
            },
          },
        },
      ],
    };
  }

  protected getDefaultOptions() {
    return Heatmap.getDefaultOptions();
  }

  protected getSchemaAdaptor(): (params: Adaptor<HeatmapOptions>) => void {
    return adaptor;
  }
}
