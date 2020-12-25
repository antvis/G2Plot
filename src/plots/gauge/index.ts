import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { GaugeOptions } from './types';
import { adaptor, statistic } from './adaptor';
import { RANGE_VALUE, PERCENT, INDICATEOR_VIEW_ID, RANGE_VIEW_ID } from './constant';
import { getIndicatorData, getRangeData } from './utils';
// 注册 shape
import './shapes/gauge';

export { GaugeOptions };

/**
 * 仪表盘盘
 */
export class Gauge extends Plot<GaugeOptions> {
  /** 图表类型 */
  public type: string = 'gauge';

  protected getDefaultOptions() {
    return {
      percent: 0, // 当前指标值
      range: {
        ticks: [],
      }, // 默认的刻度
      innerRadius: 0.9,
      radius: 0.95,
      startAngle: (-7 / 6) * Math.PI,
      endAngle: (1 / 6) * Math.PI,
      syncViewPadding: true,
      axis: {
        line: null,
        label: {
          offset: -24,
          style: {
            textAlign: 'center',
            textBaseline: 'middle',
          },
        },
        subTickLine: {
          length: -8,
        },
        tickLine: {
          length: -12,
        },
        grid: null,
      },
      indicator: {
        pointer: {
          style: {
            lineWidth: 5,
            lineCap: 'round',
          },
        },
        pin: {
          style: {
            r: 9.75,
            lineWidth: 4.5,
            fill: '#fff',
          },
        },
      },
      statistic: {
        title: false,
      },
      meta: {
        // 两个 view 的 scale 同步到 v 上
        [RANGE_VALUE]: {
          sync: 'v',
        },
        [PERCENT]: {
          sync: 'v',
          tickCount: 5,
          tickInterval: 0.2,
        },
      },
      animation: false,
    };
  }

  /**
   * 更新数据
   * @param percent
   */
  public changeData(percent: number) {
    this.updateOption({ percent });

    const indicatorView = this.chart.views.find((v) => v.id === INDICATEOR_VIEW_ID);
    if (indicatorView) {
      indicatorView.data(getIndicatorData(percent));
    }

    const rangeView = this.chart.views.find((v) => v.id === RANGE_VIEW_ID);
    if (rangeView) {
      rangeView.data(getRangeData(percent, this.options.range));
    }
    // todo 后续让 G2 层在 afterrender 之后，来重绘 annotations
    statistic({ chart: this.chart, options: this.options }, true);
  }

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<GaugeOptions> {
    return adaptor;
  }
}
