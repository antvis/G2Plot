import { Chart } from '@antv/g2';

/**
 * 可下钻的矩形分区图
 * 场景：探索云端存储在「空间类型 → 具体内容」之间的占用，点击节点查看下一层
 * 要点：
 * - interaction.drillDown 开启点击下钻（partition 默认已开启，这里显式声明便于阅读）
 * - 下钻要求父节点数值 = 子节点之和，否则下钻后宽度比例失真
 * - 层级较深时标签用 position: 'inside' + overflowHide，窄矩形自动隐藏文字
 */
const data = [
  {
    directory: '云端存储',
    storage: 1000,
    children: [
      {
        directory: '产品资料',
        storage: 420,
        children: [
          { directory: '产品文档', storage: 180 },
          { directory: '设计素材', storage: 240 },
        ],
      },
      {
        directory: '研发空间',
        storage: 350,
        children: [
          { directory: '源代码', storage: 120 },
          { directory: '构建产物', storage: 230 },
        ],
      },
      {
        directory: '运维数据',
        storage: 230,
        children: [
          { directory: '数据备份', storage: 140 },
          { directory: '运行日志', storage: 90 },
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
  encode: {
    value: 'storage',
    name: 'directory',
    color: (d: { path: string[] }) => d.path[1] || d.path[0],
  },
  labels: [
    {
      text: 'name',
      position: 'inside',
      transform: [{ type: 'overflowHide' }],
    },
  ],
  style: { inset: 1 },
  interaction: { drillDown: true },
  axis: { x: { title: '存储空间（GB）' }, y: false },
});

chart.render();
