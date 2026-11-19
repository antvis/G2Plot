import { Chart } from '@antv/g2';

/**
 * 基础圆包裹图
 * 场景：简单的两层层级结构，展示根节点下子节点的面积比例
 */
const data = [
  { name: '公司总部', value: 100 },
  { name: '市场部', value: 40, parent: '公司总部' },
  { name: '研发部', value: 60, parent: '公司总部' },
  { name: '市场部-华东', value: 15, parent: '市场部' },
  { name: '市场部-华南', value: 25, parent: '市场部' },
  { name: '研发部-硬件', value: 30, parent: '研发部' },
  { name: '研发部-软件', value: 30, parent: '研发部' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'circle-packing',
  data,
  encode: {
    name: 'name',
    value: 'value',
  },
});

chart.render();