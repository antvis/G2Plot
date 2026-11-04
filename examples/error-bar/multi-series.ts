/**
 * 多系列误差棒图
 * 场景：对比多个系列的均值及误差范围，如不同实验组的结果比较
 */
import { Chart } from '@antv/g2';

const data = [
  { month: 'Jan', series: 'A', value: 100, error: 10 },
  { month: 'Jan', series: 'B', value: 120, error: 15 },
  { month: 'Feb', series: 'A', value: 180, error: 12 },
  { month: 'Feb', series: 'B', value: 200, error: 18 },
  { month: 'Mar', series: 'A', value: 150, error: 15 },
  { month: 'Mar', series: 'B', value: 170, error: 14 },
  { month: 'Apr', series: 'A', value: 220, error: 20 },
  { month: 'Apr', series: 'B', value: 250, error: 25 },
  { month: 'May', series: 'A', value: 200, error: 18 },
  { month: 'May', series: 'B', value: 210, error: 16 },
  { month: 'Jun', series: 'A', value: 300, error: 25 },
  { month: 'Jun', series: 'B', value: 320, error: 22 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'month',
    y: 'value',
    // @ts-expect-error y0 通道为 G2 v5 interval mark 支持的功能，类型定义暂未完全覆盖
    y0: 'value - error',
    y1: 'value + error',
    color: 'series',
  },
  scale: {
    color: {
      range: ['#5B8FF9', '#5AD8A6'],
    },
  },
});

chart.render();