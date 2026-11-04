/**
 * 混合图样式与主题定制
 * 场景：品牌化柱线混合图，标题、坐标轴、图例、tooltip 统一视觉
 * 要点：共享配置（title / axis / legend / scale）放在 view 级；
 *       mark 专属样式放在各 child；title 必须是对象，theme 一行切换暗色
 */
import { Chart } from '@antv/g2';

const data = [
  { month: 'Jan', revenue: 320, profit: 62 },
  { month: 'Feb', revenue: 420, profit: 88 },
  { month: 'Mar', revenue: 380, profit: 70 },
  { month: 'Apr', revenue: 520, profit: 116 },
  { month: 'May', revenue: 480, profit: 96 },
  { month: 'Jun', revenue: 610, profit: 148 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,

  // 图表标题（主标题 + 副标题），title 必须是对象
  title: {
    title: '营收与利润',
    subtitle: '单位：万元',
    align: 'left',
    titleFontSize: 16,
    titleFontWeight: 'bold',
    titleFill: '#1d1d1d',
    subtitleFontSize: 12,
    subtitleFill: '#8c8c8c',
  },

  children: [
    {
      type: 'interval',
      encode: { x: 'month', y: 'revenue' },
      style: { fill: '#5B8FF9', radiusTopLeft: 4, radiusTopRight: 4 },
      tooltip: {
        items: [
          {
            channel: 'y',
            name: '营收',
            valueFormatter: (v: number) => `${v} 万元`,
          },
        ],
      },
    },
    {
      type: 'line',
      encode: { x: 'month', y: 'profit', shape: 'smooth' },
      style: { stroke: '#F6BD16', lineWidth: 3 },
      tooltip: {
        items: [
          {
            channel: 'y',
            name: '利润',
            valueFormatter: (v: number) => `${v} 万元`,
          },
        ],
      },
    },
  ],

  // 共享坐标轴：view 级配置统一生效
  axis: {
    x: { title: '月份', labelFontSize: 12, labelFill: '#666' },
    y: {
      title: '金额',
      labelFontSize: 12,
      labelFill: '#666',
      gridStroke: '#e8e8e8',
    },
  },

  legend: false,

  // 暗色场景改为 theme: 'classicDark'，文字与坐标轴颜色自动适配
  theme: 'classic',
});

chart.render();
