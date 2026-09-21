import { Chart } from '@antv/g2';

/**
 * 金字塔图
 * 场景：层级结构占比（用户等级分布、组织架构层级），小值在顶部
 * 要点：shape 'pyramid' + style.reverse: true 反转；与漏斗方向相反
 */
const data = [
  { level: 'VIP 用户', value: 5 },
  { level: '高级用户', value: 10 },
  { level: '普通用户', value: 20 },
  { level: '新用户', value: 25 },
  { level: '访客', value: 40 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'level', y: 'value', color: 'level', shape: 'pyramid' },
  coordinate: { transform: [{ type: 'transpose' }] },
  transform: [{ type: 'symmetryY' }],
  style: { reverse: true }, // 反转，小值在顶部形成金字塔尖
  axis: false,
  legend: false,
  labels: [
    {
      text: (d: { level: string; value: number }) => `${d.level} ${d.value}%`,
      position: 'inside',
      transform: [{ type: 'contrastReverse' }],
    },
  ],
});

chart.render();
