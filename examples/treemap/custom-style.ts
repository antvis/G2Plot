/**
 * 自定义分支配色与标签的矩形树图
 * 场景：经营看板需要按一级品类固定品牌色，并直接显示商品名称和销售额
 * 要点：颜色回调通过 path 取得一级分支；标签换行显示需显式设置 style.labelMaxLines，
 * 默认 maxLines: 1 会把「名称 + 换行 + 数值」截断成只显示名称；标签和提示使用层次节点的计算值
 */
import { Chart } from '@antv/g2';

type SalesNode = {
  data: { name: string; salesAmount?: number };
  path: string[];
  value: number;
};

const salesData = {
  name: '全部商品',
  children: [
    {
      name: '数码产品',
      children: [
        { name: '笔记本电脑', salesAmount: 420 },
        { name: '智能手机', salesAmount: 360 },
        { name: '平板电脑', salesAmount: 180 },
      ],
    },
    {
      name: '家用电器',
      children: [
        { name: '空气净化器', salesAmount: 260 },
        { name: '扫地机器人', salesAmount: 220 },
        { name: '咖啡机', salesAmount: 140 },
      ],
    },
    {
      name: '图书文具',
      children: [
        { name: '技术图书', salesAmount: 160 },
        { name: '文学图书', salesAmount: 120 },
        { name: '办公文具', salesAmount: 90 },
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
  data: { value: salesData },
  encode: {
    value: 'salesAmount',
    color: (node: SalesNode) => node.path[1] || node.data.name,
  },
  scale: { color: { range: ['#5B8FF9', '#5AD8A6', '#F6BD16'] } },
  layout: { tile: 'treemapSquarify', paddingInner: 3 },
  style: {
    labelText: (node: SalesNode) => `${node.data.name}\n${node.value} 万元`,
    labelMaxLines: 2,
    labelFill: '#fff',
    labelFontSize: 12,
    fillOpacity: 0.9,
    stroke: '#fff',
    lineWidth: 1,
  },
  legend: { color: { position: 'top' } },
  tooltip: {
    title: (node: SalesNode) => node.path.join(' / '),
    items: [
      {
        field: 'value',
        name: '销售额',
        valueFormatter: (value) => `${value} 万元`,
      },
    ],
  },
});

chart.render();
