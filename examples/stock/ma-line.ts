import { Chart } from '@antv/g2';

/**
 * K 线 + 均线：价格趋势与均线系统
 * 场景：技术分析看盘，MA5 / MA10 判断短期与中期趋势
 * 要点：均线在数据层计算（mark transform 不做窗口聚合），k 线两个 link + 两条 line 同 view 共享 y 轴
 */
type KlinePoint = {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
};

const klineData: KlinePoint[] = [
  { date: '09-01', open: 24.2, close: 24.85, high: 25.1, low: 24.05 },
  { date: '09-02', open: 24.9, close: 24.55, high: 25.2, low: 24.4 },
  { date: '09-03', open: 24.5, close: 23.8, high: 24.6, low: 23.7 },
  { date: '09-04', open: 23.85, close: 24.3, high: 24.45, low: 23.6 },
  { date: '09-05', open: 24.35, close: 25.1, high: 25.35, low: 24.25 },
  { date: '09-08', open: 25.2, close: 24.95, high: 25.4, low: 24.8 },
  { date: '09-09', open: 24.9, close: 25.6, high: 25.75, low: 24.85 },
  { date: '09-10', open: 25.7, close: 25.35, high: 25.9, low: 25.15 },
  { date: '09-11', open: 25.3, close: 26.1, high: 26.3, low: 25.25 },
  { date: '09-12', open: 26.15, close: 26.45, high: 26.8, low: 25.95 },
  { date: '09-15', open: 26.5, close: 26.05, high: 26.7, low: 25.9 },
  { date: '09-16', open: 26.0, close: 26.75, high: 26.95, low: 25.85 },
  { date: '09-17', open: 26.8, close: 26.4, high: 27.05, low: 26.25 },
  { date: '09-18', open: 26.35, close: 27.2, high: 27.35, low: 26.2 },
  { date: '09-19', open: 27.25, close: 26.9, high: 27.5, low: 26.7 },
  { date: '09-22', open: 26.85, close: 27.55, high: 27.7, low: 26.75 },
];

// 窗口不足时返回 null，line 默认在 null 处断开，正好对应均线未形成的前几根
const movingAverage = (values: number[], window: number): (number | null)[] =>
  values.map((_, index) => {
    if (index < window - 1) return null;
    const slice = values.slice(index - window + 1, index + 1);
    return slice.reduce((sum, value) => sum + value, 0) / window;
  });

const closePrices = klineData.map((d) => d.close);
const ma5 = movingAverage(closePrices, 5);
const ma10 = movingAverage(closePrices, 10);
const data = klineData.map((d, index) => ({ ...d, ma5: ma5[index], ma10: ma10[index] }));

const RISE_COLOR = '#EF5350';
const FALL_COLOR = '#26A69A';
const trendColor = (d: KlinePoint) => (d.close >= d.open ? RISE_COLOR : FALL_COLOR);

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  children: [
    {
      type: 'link',
      encode: { x: 'date', y: 'low', y1: 'high' },
      style: { stroke: trendColor, lineWidth: 1 },
      tooltip: false,
    },
    {
      type: 'link',
      encode: { x: 'date', y: 'open', y1: 'close' },
      style: { stroke: trendColor, lineWidth: 8 },
      axis: {
        x: { title: '交易日期' },
        y: { title: '价格（元）' },
      },
    },
    {
      type: 'line',
      encode: { x: 'date', y: 'ma5' },
      style: { stroke: '#F6BD16', lineWidth: 1.5 },
      tooltip: false,
    },
    {
      type: 'line',
      encode: { x: 'date', y: 'ma10' },
      style: { stroke: '#5B8FF9', lineWidth: 1.5, lineDash: [4, 4] },
      tooltip: false,
    },
  ],
});

chart.render();
