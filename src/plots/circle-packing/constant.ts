import { CirclePackingOptions } from './types';

/** 默认的源字段 */
export const RAW_FIELDS = ['x', 'y', 'r', 'name', 'value', 'path', 'depth'];

export const DEFAULT_OPTIONS: Partial<CirclePackingOptions> = {
  // 默认按照 name 字段对颜色进行分类
  colorField: 'name',
  autoFit: true,
  pointStyle: {
    lineWidth: 0,
    stroke: '#fff',
  },
  // 默认不开启图例
  legend: false,
  hierarchyConfig: {
    size: [1, 1] as [number, number], // width, height
    padding: 0,
  },
  label: {
    fields: ['name'],
    layout: {
      type: 'limit-in-shape',
    },
  },
  tooltip: {
    showMarkers: false,
    showTitle: false,
  },
  // 默认不可以下钻
  drilldown: { enabled: false },
};
