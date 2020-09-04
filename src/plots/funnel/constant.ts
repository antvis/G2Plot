// 漏斗转化率: data[n][yField] / data[0][yField]
export const FUNNEL_PERCENT = '$$percentage$$';
// 漏斗单项占总体和的百分比，用于动态漏斗图计算高度：
// data[n][yField] / sum(data[0-n][yField])
export const FUNNEL_TOTAL_PERCENT = '$$total_percentage$$';
