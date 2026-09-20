import { Chart } from '@antv/g2';

/**
 * 组件样式与主题：title / axis / legend / tooltip 的视觉定制
 * 场景：品牌化定制（颜色、字体、字号）；暗色场景直接用内置主题 theme: 'classicDark'
 * 要点：
 * - 图表标题 title 必须是对象，主标题文本在 title.title
 * - 内置主题：'light' | 'dark' | 'classic' | 'classicDark' | 'academy'，一行切换整体配色
 */
const data = [
  { month: 'Jan', series: '销售额', value: 120 },
  { month: 'Feb', series: '销售额', value: 200 },
  { month: 'Mar', series: '销售额', value: 150 },
  { month: 'Apr', series: '销售额', value: 280 },
  { month: 'Jan', series: '利润', value: 40 },
  { month: 'Feb', series: '利润', value: 90 },
  { month: 'Mar', series: '利润', value: 60 },
  { month: 'Apr', series: '利润', value: 120 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data,
  encode: { x: 'month', y: 'value', color: 'series' },

  // 图表标题（主标题 + 副标题）
  title: {
    title: '月度销售与利润',
    subtitle: '单位：万元',
    align: 'left', // 'left' | 'center' | 'right'
    titleFontSize: 16,
    titleFontWeight: 'bold',
    titleFill: '#1d1d1d',
    subtitleFontSize: 12,
    subtitleFill: '#8c8c8c',
  },

  // 坐标轴：标题与刻度文字样式、网格线
  axis: {
    x: {
      title: '月份',
      titleFontSize: 13,
      titleFill: '#333',
      labelFontSize: 12,
      labelFill: '#666',
    },
    y: {
      title: '金额',
      titleFontSize: 13,
      titleFill: '#333',
      labelFontSize: 12,
      labelFill: '#666',
      gridStroke: '#e8e8e8',
    },
  },

  // 图例（color 通道）：位置与文字样式
  legend: {
    color: {
      position: 'top',
      itemLabelFontSize: 12,
      itemLabelFill: '#333',
    },
  },

  // tooltip：标题取 month 字段，条目重命名并格式化
  tooltip: {
    title: 'month',
    items: [{ field: 'value', name: '数值', valueFormatter: (v) => `${v} 万元` }],
  },

  // 暗色场景改为 theme: 'classicDark'，所有组件文字颜色自动适配
});

chart.render();
