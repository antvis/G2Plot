import { get, each } from '@antv/util';
import { Element } from '@antv/g2';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { Data, Datum, StateCondition, StateName, StateObject } from '../../types';
import { findViewById, getAllElementsRecursively } from '../../utils';
import { SankeyOptions } from './types';
import { adaptor } from './adaptor';
import { transformToViewsData } from './helper';
import { EDGES_VIEW_ID, NODES_VIEW_ID } from './constant';
// 桑基图内置交互
import './interactions';

export type { SankeyOptions };

/**
 *  桑基图 Sankey
 */
export class Sankey extends Plot<SankeyOptions> {
  /** 图表类型 */
  public type: string = 'sankey';

  static getDefaultOptions(): Partial<SankeyOptions> {
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
      edgeState: {
        active: {
          style: {
            opacity: 0.8,
            lineWidth: 0,
          },
        },
      },
      label: {
        formatter: ({ name }) => name,
        callback: (x: number[]) => {
          const isLast = x[1] === 1; // 最后一列靠边的节点
          return {
            style: {
              fill: '#545454',
              textAlign: isLast ? 'end' : 'start',
            },
            offsetX: isLast ? -8 : 8,
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
      animation: {
        appear: {
          animation: 'wave-in',
        },
        enter: {
          animation: 'wave-in',
        },
      },
    };
  }

  /**
   * @override
   * @param data
   */
  public changeData(data: Data) {
    this.updateOption({ data });

    const { nodes, edges } = transformToViewsData(this.options, this.chart.width, this.chart.height);

    const nodesView = findViewById(this.chart, NODES_VIEW_ID);
    const edgesView = findViewById(this.chart, EDGES_VIEW_ID);

    nodesView.changeData(nodes);
    edgesView.changeData(edges);
  }

  /**
   * 设置状态
   * @param type 状态类型，支持 'active' | 'inactive' | 'selected' 三种
   * @param conditions 条件，支持数组
   * @param status 是否激活，默认 true
   */
  public setState(type: StateName, condition: StateCondition, status: boolean = true) {
    const elements = getAllElementsRecursively(this.chart);

    each(elements, (ele: Element) => {
      if (condition(ele.getData())) {
        ele.setState(type, status);
      }
    });
  }

  /**
   * 获取状态
   */
  public getStates(): StateObject[] {
    const elements = getAllElementsRecursively(this.chart);

    const stateObjects: StateObject[] = [];
    each(elements, (element: Element) => {
      const data = element.getData();
      const states = element.getStates();
      each(states, (state) => {
        stateObjects.push({ data, state, geometry: element.geometry, element });
      });
    });

    return stateObjects;
  }

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<SankeyOptions> {
    return adaptor;
  }

  /**
   * 获取 条形图 默认配置
   */
  protected getDefaultOptions() {
    return Sankey.getDefaultOptions();
  }
}
