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
  protected getDefaultOptions(options: FunnelOptions): Partial<FunnelOptions> {
    const { xField, yField, dynamicHeight, compareField } = options;

    let additionalOption = {};

    if (dynamicHeight) {
      additionalOption = {
        tooltip: {
          itemTpl:
            '<li class="g2-tooltip-list-item" data-index={index}>' +
            '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
            `<span class="g2-tooltip-name">{${xField}}</span>` +
            `<span class="g2-tooltip-value" style="display: inline-block; float: right; margin-left: 30px;">{${yField}}</span></li>`,
        },
      };
    } else if (compareField) {
      additionalOption = {
        appendPadding: [50, 50, 0, 50],
        label: {
          callback: (xField, yField) => ({
            content: `${yField}`,
          }),
        },
      };
    }

    return deepAssign(
      {},
      super.getDefaultOptions(),
      {
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
          callback: (xField, yField) => ({
            content: `${xField} ${yField}`,
          }),
        },
        tooltip: {
          showTitle: false,
          showMarkers: false,
          shared: false,
        },
        conversionTag: {
          offsetX: 10,
          offsetY: 0,
          style: {},
          formatter: (datum) => `转化率${(datum.$$percentage$$ * 100).toFixed(2)}%`,
        },
      },
      additionalOption
    );
  }

  /**
   * 获取 漏斗图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<FunnelOptions> {
    return adaptor;
  }
}
