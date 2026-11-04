import { Chart } from '@antv/g2';

/**
 * 径向树图
 * 场景：层级较深、节点较多，用放射状布局节省画布空间（如产品模块地图、知识体系）
 * 要点：1) coordinate 用 polar，层级深度映射为半径，兄弟节点映射为角度；
 *       2) 不需要 transpose，根节点位于圆心；
 *       3) 用 nodeFill 回调按 d.depth 着色，强化层级感
 */
const moduleData = {
  module: '数据平台',
  children: [
    {
      module: '数据接入',
      children: [
        { module: '日志采集', taskCount: 12 },
        { module: '数据库同步', taskCount: 8 },
        { module: 'API 推送', taskCount: 5 },
      ],
    },
    {
      module: '数据开发',
      children: [
        { module: '离线计算', taskCount: 20 },
        { module: '实时计算', taskCount: 14 },
      ],
    },
    {
      module: '数据服务',
      children: [
        { module: '指标查询', taskCount: 9 },
        { module: '标签服务', taskCount: 6 },
      ],
    },
  ],
};

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'tree',
  data: { type: 'inline', value: moduleData },
  encode: { value: 'taskCount' },
  coordinate: { type: 'polar' },
  style: {
    nodeFill: (d: any) => ['#722ed1', '#9254de', '#b37feb'][d.depth] ?? '#d3adf7',
    linkStroke: '#d3adf7',
    linkLineWidth: 1,
    labelText: (d: any) => d.data.module,
    labelFontSize: 10,
    labelFill: '#595959',
    labelDx: 4,
    labelBackground: true,
    labelBackgroundFill: '#ffffff',
    labelBackgroundOpacity: 0.8,
  },
});

chart.render();
