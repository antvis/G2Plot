import { Chart } from '@antv/g2';

/**
 * 基础树图（横向组织架构）
 * 场景：展示组织架构、分类层级等「一对多」的层级关系
 * 要点：1) 数据是嵌套 JSON（children 字段），不是长表数组；
 *       2) 必须包一层 data: { value: treeData }，直接把树对象传给 data 会白屏；
 *       3) transpose 让层级从左到右展开，部门名称较长时比纵向更易读
 */
const orgData = {
  department: '总公司',
  children: [
    {
      department: '研发中心',
      children: [
        { department: '前端组', headcount: 45 },
        { department: '后端组', headcount: 70 },
        { department: '算法组', headcount: 35 },
      ],
    },
    {
      department: '市场中心',
      children: [
        { department: '品牌组', headcount: 25 },
        { department: '增长组', headcount: 55 },
      ],
    },
    {
      department: '产品中心',
      children: [
        { department: 'B 端产品', headcount: 35 },
        { department: 'C 端产品', headcount: 25 },
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
  data: { type: 'inline', value: orgData },
  encode: { value: 'headcount' },
  coordinate: { transform: [{ type: 'transpose' }] },
  style: {
    // 叶子节点用主题蓝，内部节点用深灰
    nodeFill: (d: any) => (d.height === 0 ? '#5B8FF9' : '#1d1d1d'),
    linkStroke: '#bfbfbf',
    linkLineWidth: 1,
    // 标签读原始数据要走 d.data
    labelText: (d: any) => d.data.department,
    labelFontSize: 11,
    labelFill: '#595959',
    labelPosition: (d: any) => (d.height === 0 ? 'right' : 'left'),
    labelTextAlign: (d: any) => (d.height === 0 ? 'start' : 'end'),
    labelDx: (d: any) => (d.height === 0 ? 6 : -6),
  },
});

chart.render();
