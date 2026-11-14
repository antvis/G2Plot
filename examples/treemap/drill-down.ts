/**
 * 可层级下钻的矩形树图
 * 场景：先比较各业务线营收，再点击业务线查看具体产品构成，并可沿面包屑返回
 * 要点：interaction.treemapDrillDown 专用于 treemap；数据需包含多个 children 层级
 */
import { Chart } from '@antv/g2';

const revenueData = {
  name: '公司营收',
  children: [
    {
      name: '企业服务',
      children: [
        { name: '咨询服务', revenue: 520 },
        { name: '订阅软件', revenue: 460 },
        { name: '实施服务', revenue: 280 },
      ],
    },
    {
      name: '智能硬件',
      children: [
        { name: '工业网关', revenue: 380 },
        { name: '边缘计算器', revenue: 320 },
        { name: '传感器', revenue: 190 },
      ],
    },
    {
      name: '数字内容',
      children: [
        { name: '在线课程', revenue: 240 },
        { name: '专业报告', revenue: 150 },
        { name: '会员内容', revenue: 110 },
      ],
    },
  ],
};

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'treemap',
  data: { value: revenueData },
  encode: { value: 'revenue' },
  layout: { tile: 'treemapSquarify', paddingInner: 2 },
  style: { labelFontSize: 12, stroke: '#fff', lineWidth: 1 },
  interaction: {
    treemapDrillDown: {
      breadCrumbFill: '#1d1d1d',
      breadCrumbFontSize: 12,
      activeFill: 'rgba(0, 0, 0, 0.5)',
    },
  },
});

chart.render();
