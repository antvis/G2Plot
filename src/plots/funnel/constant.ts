// 漏斗转化率: data[n][yField] / data[0][yField]
export const FUNNEL_PERCENT = '$$percentage$$';
// 漏斗单项占总体和的百分比，用于动态漏斗图计算高度：
// data[n][yField] / sum(data[0-n][yField])
export const FUNNEL_TOTAL_PERCENT = '$$total_percentage$$';
// 漏斗多边型 x 坐标
export const PLOYGON_X = '$$x$$';
export const PLOYGON_Y = '$$y$$';

// 普通漏斗 label 的默认设置
export const FUNNEL_LABEL = {
  offset: 0,
  position: 'middle',
  // layout: {
  //   type: 'limit-in-shape',
  // },
  style: {
    fill: '#fff',
    fontSize: 12,
  },
  callback: (xField, yField) => `${yField}`,
};
