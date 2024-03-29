import { get } from '@antv/util';
import { Datum } from '../../types';

export const X_FIELD = 'x';
export const Y_FIELD = 'y';
export const NODE_COLOR_FIELD = 'name';
export const EDGE_COLOR_FIELD = 'source';

export const DEFAULT_OPTIONS = {
  nodeStyle: {
    opacity: 1,
    fillOpacity: 1,
    lineWidth: 1,
  },
  edgeStyle: {
    opacity: 0.5,
    lineWidth: 2,
  },
  label: {
    fields: ['x', 'name'],
    callback: (x: number[], name: string) => {
      const centerX = (x[0] + x[1]) / 2;
      const offsetX = centerX > 0.5 ? -4 : 4;
      return {
        offsetX,
        content: name,
      };
    },
    labelEmit: true,
    style: {
      fill: '#8c8c8c',
    },
  },
  tooltip: {
    showTitle: false,
    showMarkers: false,
    fields: ['source', 'target', 'value', 'isNode'],
    // 内置：node 不显示 tooltip (业务层自行处理)，edge 显示 tooltip
    showContent: (items) => {
      return !get(items, [0, 'data', 'isNode']);
    },
    formatter: (datum: Datum) => {
      const { source, target, value } = datum;
      return {
        name: `${source} -> ${target}`,
        value,
      };
    },
  },
  interactions: [
    {
      type: 'element-active',
    },
  ],
  weight: true,
  nodePaddingRatio: 0.1,
  nodeWidthRatio: 0.05,
};
