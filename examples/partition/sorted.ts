import { Chart } from '@antv/g2';

/**
 * 子节点按数值降序排列的矩形分区图
 * 场景：成本构成分析，希望每一层都从大到小排列，快速看出大头
 * 要点：
 * - layout.sort 对每一层子节点排序，回调收到原始数据节点（默认字段名 name/value）
 * - layout.fillParent 默认 true，子节点按数值比例铺满父节点宽度
 * - 数据沿用默认 name/value 字段，因此 encode 只需覆盖 color 通道
 */
const data = [
  {
    name: '2026 云服务成本',
    value: 1000,
    children: [
      {
        name: '计算',
        value: 420,
        children: [
          { name: '容器集群', value: 240 },
          { name: '函数计算', value: 110 },
          { name: '虚拟机', value: 70 },
        ],
      },
      {
        name: '存储',
        value: 340,
        children: [
          { name: '对象存储', value: 190 },
          { name: '块存储', value: 150 },
        ],
      },
      {
        name: '网络',
        value: 240,
        children: [
          { name: 'CDN 流量', value: 160 },
          { name: '负载均衡', value: 80 },
        ],
      },
    ],
  },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'partition',
  data,
  layout: {
    fillParent: true,
    sort: (a, b) => b.value - a.value,
  },
  encode: {
    color: (d: { path: string[] }) => d.path[1] || d.path[0],
  },
  labels: [
    {
      text: 'name',
      position: 'inside',
      transform: [{ type: 'overflowHide' }],
    },
  ],
  style: { inset: 0.5 },
  axis: { x: { title: '成本（万元）' }, y: false },
});

chart.render();
