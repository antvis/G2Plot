import { get } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { Datum } from '../../types';
import { SankeyOptions } from './types';
import { adaptor } from './adaptor';

export { SankeyOptions };

/**
 *  桑基图 Sankey
 */
export class Sankey extends Plot<SankeyOptions> {
  /** 图表类型 */
  public type: string = 'sankey';

  protected getDefaultOptions() {
    return {
      appendPadding: 8,
      syncViewPadding: true,
      nodeStyle: {
        opacity: 1,
        fillOpacity: 1,
        lineWidth: 1,
      },
      edgeStyle: {
        opacity: 0.3,
        lineWidth: 0,
      },
      label: {
        fields: ['x', 'name'],
        callback: (x: number[], name: string) => {
          const isLast = x[1] === 1; // 最后一列靠边的节点
          return {
            style: {
              fill: '#545454',
              textAlign: isLast ? 'end' : 'start',
            },
            offsetX: isLast ? -8 : 8,
            content: name,
          };
        },
        layout: [
          {
            type: 'hide-overlap',
          },
        ],
      },
      tooltip: {
        showTitle: false,
        showMarkers: false,
        shared: false,
        fields: ['name', 'source', 'target', 'value', 'isNode'],
        // 内置：node 不显示 tooltip，edge 显示 tooltip
        showContent: (items) => {
          return !get(items, [0, 'data', 'isNode']);
        },
        formatter: (datum: Datum) => {
          const { source, target, value } = datum;
          return {
            name: source + ' -> ' + target,
            value,
          };
        },
      },
      nodeWidthRatio: 0.008,
      nodePaddingRatio: 0.01,
    };
  }

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<SankeyOptions> {
    return adaptor;
  }
}
