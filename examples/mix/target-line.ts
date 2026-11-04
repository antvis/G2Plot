/**
 * 柱 + 目标参考线
 * 场景：月度完成量 vs 固定目标，快速看出达标/未达标
 * 要点：参考线用 lineY mark（独立一行数据，encode.y 指向阈值字段）；
 *       参考线不参与图例，tooltip: false 避免和主数据混淆
 */
import { Chart } from '@antv/g2';

const data = [
  { month: 'Jan', completed: 420 },
  { month: 'Feb', completed: 530 },
  { month: 'Mar', completed: 480 },
  { month: 'Apr', completed: 610 },
  { month: 'May', completed: 570 },
  { month: 'Jun', completed: 660 },
];

// 目标线数据：一行即可，lineY 会横向铺满坐标系
const target = [{ threshold: 500 }];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  children: [
    {
      type: 'interval',
      encode: { x: 'month', y: 'completed' },
      style: { fill: '#5B8FF9', radiusTopLeft: 4, radiusTopRight: 4 },
    },
    {
      type: 'lineY',
      data: target,
      encode: { y: 'threshold' },
      style: { stroke: '#F4664A', lineWidth: 2, lineDash: [6, 4] },
      labels: [
        {
          text: '目标 500',
          position: 'right',
          style: { fill: '#F4664A', fontSize: 12 },
        },
      ],
      tooltip: false,
    },
  ],
  axis: { x: { title: '月份' }, y: { title: '订单量' } },
  legend: false,
});

chart.render();
