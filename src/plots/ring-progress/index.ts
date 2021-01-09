import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { getProgressData } from '../progress/utils';
import { RingProgressOptions } from './types';
import { adaptor, statistic } from './adaptor';

export { RingProgressOptions };

export class RingProgress extends Plot<RingProgressOptions> {
  /** 图表类型 */
  public type: string = 'ring-process';

  protected getDefaultOptions() {
    return {
      percent: 0.2,
      innerRadius: 0.8,
      radius: 0.98,
      color: ['#FAAD14', '#E8EDF3'],
      statistic: {
        title: false,
        content: {
          style: {
            fontSize: '14px',
            fontWeight: 300,
            fill: '#4D4D4D',
            textAlign: 'center',
            textBaseline: 'middle',
          },
          formatter: ({ percent }) => `${(percent * 100).toFixed(2)}%`,
        },
      },
      animation: true,
    };
  }

  /**
   * 更新数据
   * @param percent
   */
  public changeData(percent: number) {
    this.updateOption({ percent });

    this.chart.data(getProgressData(percent));
    // todo 后续让 G2 层在 afterrender 之后，来重绘 annotations
    statistic({ chart: this.chart, options: this.options }, true);
  }

  /**
   * 获取 环形进度图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<RingProgressOptions> {
    return adaptor;
  }
}
