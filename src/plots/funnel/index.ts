import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { Adaptor } from '../../core/adaptor';
import { FunnelOptions } from './types';
import { adaptor } from './adaptor';

export { FunnelOptions };

export class Funnel extends Plot<FunnelOptions> {
  /** 图表类型 */
  public type: string = 'funnel';

  /**
   * 获取 漏斗图 默认配置项
   */
  protected getDefaultOptions(): Partial<FunnelOptions> {
    return deepAssign({}, super.getDefaultOptions(), {
      // annotation 无法自适应 chart，先用 appendPadding hack, 随后看看如何自适应
      appendPadding: [0, 50],
      label: {
        offset: 0,
        position: 'middle',
        // layout: {
        //   type: 'limit-in-shape',
        // },
        style: {
          fill: '#fff',
          fontSize: 12,
        },
        callback: (xField, yField, percent) => {
          return {
            content: `${xField} ${yField}`,
          };
        },
      },
      tooltip: {
        showTitle: false,
        showMarkers: false,
        shared: false,
        formatter: (datum) => {
          return { name: 'abc', value: '123' };
        },
      },
      conversionTag: {
        offsetX: 10,
        offsetY: 0,
        style: {},
        formatter: (datum) => `转化率${(datum.$$percentage$$ * 100).toFixed(2)}%`,
      },
    });
  }

  /**
   * 获取 漏斗图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<FunnelOptions> {
    return adaptor;
  }
}
