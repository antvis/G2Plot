// 漏斗占比: data[n][yField] / data[0][yField]
export const FUNNEL_PERCENT = '$$percentage$$';
// 漏斗映射值
export const FUNNEL_MAPPING_VALUE = '$$mappingValue$$';
// 漏斗转化率: data[n][yField] / data[n-1][yField];
export const FUNNEL_CONVERSATION = '$$conversion$$';
// 漏斗单项占总体和的百分比，用于动态漏斗图计算高度：
// data[n][yField] / sum(data[0-n][yField])
export const FUNNEL_TOTAL_PERCENT = '$$totalPercentage$$';
// 漏斗多边型 x 坐标
export const PLOYGON_X = '$$x$$';
export const PLOYGON_Y = '$$y$$';

/**
 * 漏斗图 默认配置项
 */
export const DEFAULT_OPTIONS = {
  appendPadding: [0, 80],
  minSize: 0,
  maxSize: 1,
  meta: {
    [FUNNEL_MAPPING_VALUE]: {
      min: 0,
      max: 1,
      nice: false,
    },
  },
  label: {
    style: {
      fill: '#fff',
      fontSize: 12,
    },
  },
  tooltip: {
    showTitle: false,
    showMarkers: false,
    shared: false,
  },
  conversionTag: {
    offsetX: 10,
    offsetY: 0,
    style: {
      fontSize: 12,
      fill: 'rgba(0,0,0,0.45)',
    },
  },
};
