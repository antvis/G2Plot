import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { GaugeOptions } from './types';
import { adaptor } from './adaptor';
import { RANGE_VALUE, PERCENT } from './constant';
// 注册 shape
import './shapes/gauge';

export { GaugeOptions };

/**
 * 仪表盘盘
 */
export class Gauge extends Plot<GaugeOptions> {
  /** 图表类型 */
  public type: string = 'gauge';

  protected getDefaultOptions(options: GaugeOptions) {
    const { percent } = options;
    return {
      percent: 0, // 当前指标值
      range: {
        ticks: [0, percent, 1],
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
            stroke: '#1890FF', // TODO 应该取主题色
            lineWidth: 5,
            lineCap: 'round',
          },
        },
        pin: {
          style: {
            stroke: '#1890FF',
            r: 9.75,
            lineWidth: 4.5,
            fill: '#fff',
          },
        },
      },
      statistic: {
        title: false,
        content: {
          formatter: ({ percent }) => `${(percent * 100).toFixed(2)}%`,
          style: {
            opacity: 0.75,
            fontSize: 30,
            textAlign: 'center',
            textBaseline: 'bottom',
          },
          offsetY: -16,
        },
      },
      meta: {
        // 两个 view 的 scale 同步到 v 上
        [RANGE_VALUE]: {
          sync: 'v',
        },
        [PERCENT]: {
          sync: 'v',
        },
      },
    };
  }

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<GaugeOptions> {
    return adaptor;
  }
}
