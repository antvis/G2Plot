import { Chart } from '@antv/g2';

/**
 * 带数据标签的玉珏图
 * 用途：直接在环带外侧标注数值，减少读图时的视线切换
 * 场景：季度目标完成量、各环节转化量汇报
 * 关键要点：labels 用 position: 'outside' 把数值放到外圈；tooltip 补充字段名与单位，避免标签文本过长
 */
const data = [
  { stage: '需求评审', tasks: 42 },
  { stage: '开发中', tasks: 68 },
  { stage: '联调', tasks: 35 },
  { stage: '测试', tasks: 51 },
  { stage: '已上线', tasks: 88 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'stage', y: 'tasks', color: 'stage' },
  coordinate: { type: 'polar', innerRadius: 0.3 },
  labels: [
    {
      text: 'tasks',
      position: 'outside',
      style: { fontSize: 11, fill: '#555' },
    },
  ],
  tooltip: {
    title: 'stage',
    items: [{ channel: 'y', name: '任务数' }],
  },
  legend: false,
});

chart.render();