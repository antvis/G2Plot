import { Chart } from '@antv/g2';

/**
 * K 线 + 成交量副图
 * 场景：看盘时价格与量能联动，放量上涨 / 缩量下跌一屏可见
 * 要点：spaceFlex 纵向切分两块视图（ratio 3:1），上下视图各自独立 y 轴，x 轴只在底部显示
 */
type StockPoint = {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
};

const data: StockPoint[] = [
  { date: '09-01', open: 24.2, close: 24.85, high: 25.1, low: 24.05, volume: 128000 },
  { date: '09-02', open: 24.9, close: 24.55, high: 25.2, low: 24.4, volume: 96000 },
  { date: '09-03', open: 24.5, close: 23.8, high: 24.6, low: 23.7, volume: 152000 },
  { date: '09-04', open: 23.85, close: 24.3, high: 24.45, low: 23.6, volume: 87000 },
  { date: '09-05', open: 24.35, close: 25.1, high: 25.35, low: 24.25, volume: 174000 },
  { date: '09-08', open: 25.2, close: 24.95, high: 25.4, low: 24.8, volume: 113000 },
  { date: '09-09', open: 24.9, close: 25.6, high: 25.75, low: 24.85, volume: 201000 },
  { date: '09-10', open: 25.7, close: 25.35, high: 25.9, low: 25.15, volume: 98000 },
  { date: '09-11', open: 25.3, close: 26.1, high: 26.3, low: 25.25, volume: 186000 },
  { date: '09-12', open: 26.15, close: 26.45, high: 26.8, low: 25.95, volume: 142000 },
];

const RISE_COLOR = '#EF5350';
const FALL_COLOR = '#26A69A';
const trendColor = (d: StockPoint) => (d.close >= d.open ? RISE_COLOR : FALL_COLOR);

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'spaceFlex',
  data,
  direction: 'col',
  ratio: [3, 1],
  children: [
    {
      // 上：K 线主图
      type: 'view',
      axis: { x: false },
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
          axis: { y: { title: '价格（元）' } },
        },
      ],
    },
    {
      // 下：成交量副图，独立 y 轴
      type: 'view',
      children: [
        {
          type: 'interval',
          encode: { x: 'date', y: 'volume' },
          style: { fill: trendColor },
          axis: {
            x: { title: '交易日期' },
            y: { title: '成交量（手）' },
          },
          tooltip: {
            title: 'date',
            items: [{ field: 'volume', name: '成交量', valueFormatter: (v: number) => `${v.toLocaleString()} 手` }],
          },
        },
      ],
    },
  ],
});

chart.render();
