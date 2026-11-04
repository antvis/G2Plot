/**
 * 基础误差棒图
 * 场景：展示每个类别的均值及其标准差误差范围，科学实验数据展示
 */
import { Chart } from '@antv/g2';

const data = [
  { month: 'Jan', value: 100, error: 10 },
  { month: 'Feb', value: 200, error: 15 },
  { month: 'Mar', value: 150, error: 12 },
  { month: 'Apr', value: 280, error: 20 },
  { month: 'May', value: 220, error: 18 },
  { month: 'Jun', value: 350, error: 25 },
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
  },
  style: {
    fill: '#5B8FF9',
    stroke: '#5B8FF9',
  },
});

chart.render();