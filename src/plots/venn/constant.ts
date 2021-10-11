import { VennOptions } from './types';

// 一些字段常量定义，需要在文档初告知用户
export const ID_FIELD = 'id';
export const PATH_FIELD = 'path';

/**
 * 韦恩图 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<VennOptions> = {
  appendPadding: [10, 0, 20, 0],
  blendMode: 'multiply',
  tooltip: {
    showTitle: false,
    showMarkers: false,
    fields: ['id', 'size'],
    formatter: (datum) => {
      return { name: datum.id, value: datum.size };
    },
  },
  legend: { position: 'top-left' },
  label: {
    style: {
      textAlign: 'center',
      fill: '#fff',
    },
  },
  // 默认不开启 图例筛选交互
  interactions: [{ type: 'legend-filter', enable: false }],
  state: {
    active: {
      style: {
        stroke: '#000',
      },
    },
    selected: {
      style: {
        stroke: '#000',
        lineWidth: 2,
      },
    },
    inactive: {
      style: {
        fillOpacity: 0.3,
        strokeOpacity: 0.3,
      },
    },
  },
  // 韦恩图的默认内置注册的交互
  defaultInteractions: ['tooltip', 'venn-legend-active'],
};
