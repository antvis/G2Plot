/**
 * 基础矩形树图
 * 场景：按商品品类和具体商品观察销售额构成，矩形面积代表销售额大小
 * 要点：使用 children 嵌套树形数据；encode.value 映射叶节点数值，父级数值自动汇总
 */
import { Chart } from '@antv/g2';

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
  encode: { value: 'salesAmount' },
  layout: { tile: 'treemapSquarify', paddingInner: 2 },
});

chart.render();
