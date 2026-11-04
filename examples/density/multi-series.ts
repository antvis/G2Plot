import { Chart } from '@antv/g2';

/**
 * 多系列密度图
 * 场景：同一门店类型下对比新老会员的客单价分布，每组密度并排显示
 * 要点：groupBy 必须同时包含 x 字段和系列字段；
 *       encode 增加 series（决定并排位置）与 color（决定颜色），两者都映射系列字段
 */
const data = [
  { storeType: '旗舰店', memberType: '新会员', orderAmount: 120 },
  { storeType: '旗舰店', memberType: '新会员', orderAmount: 150 },
  { storeType: '旗舰店', memberType: '新会员', orderAmount: 180 },
  { storeType: '旗舰店', memberType: '新会员', orderAmount: 200 },
  { storeType: '旗舰店', memberType: '新会员', orderAmount: 220 },
  { storeType: '旗舰店', memberType: '新会员', orderAmount: 240 },
  { storeType: '旗舰店', memberType: '新会员', orderAmount: 260 },
  { storeType: '旗舰店', memberType: '新会员', orderAmount: 280 },
  { storeType: '旗舰店', memberType: '新会员', orderAmount: 300 },
  { storeType: '旗舰店', memberType: '新会员', orderAmount: 330 },
  { storeType: '旗舰店', memberType: '新会员', orderAmount: 360 },
  { storeType: '旗舰店', memberType: '新会员', orderAmount: 400 },
  { storeType: '旗舰店', memberType: '老会员', orderAmount: 200 },
  { storeType: '旗舰店', memberType: '老会员', orderAmount: 240 },
  { storeType: '旗舰店', memberType: '老会员', orderAmount: 280 },
  { storeType: '旗舰店', memberType: '老会员', orderAmount: 300 },
  { storeType: '旗舰店', memberType: '老会员', orderAmount: 320 },
  { storeType: '旗舰店', memberType: '老会员', orderAmount: 350 },
  { storeType: '旗舰店', memberType: '老会员', orderAmount: 380 },
  { storeType: '旗舰店', memberType: '老会员', orderAmount: 420 },
  { storeType: '旗舰店', memberType: '老会员', orderAmount: 460 },
  { storeType: '旗舰店', memberType: '老会员', orderAmount: 500 },
  { storeType: '旗舰店', memberType: '老会员', orderAmount: 560 },
  { storeType: '旗舰店', memberType: '老会员', orderAmount: 620 },
  { storeType: '社区店', memberType: '新会员', orderAmount: 60 },
  { storeType: '社区店', memberType: '新会员', orderAmount: 70 },
  { storeType: '社区店', memberType: '新会员', orderAmount: 80 },
  { storeType: '社区店', memberType: '新会员', orderAmount: 90 },
  { storeType: '社区店', memberType: '新会员', orderAmount: 100 },
  { storeType: '社区店', memberType: '新会员', orderAmount: 110 },
  { storeType: '社区店', memberType: '新会员', orderAmount: 120 },
  { storeType: '社区店', memberType: '新会员', orderAmount: 130 },
  { storeType: '社区店', memberType: '新会员', orderAmount: 140 },
  { storeType: '社区店', memberType: '新会员', orderAmount: 150 },
  { storeType: '社区店', memberType: '新会员', orderAmount: 170 },
  { storeType: '社区店', memberType: '新会员', orderAmount: 190 },
  { storeType: '社区店', memberType: '老会员', orderAmount: 90 },
  { storeType: '社区店', memberType: '老会员', orderAmount: 100 },
  { storeType: '社区店', memberType: '老会员', orderAmount: 110 },
  { storeType: '社区店', memberType: '老会员', orderAmount: 130 },
  { storeType: '社区店', memberType: '老会员', orderAmount: 140 },
  { storeType: '社区店', memberType: '老会员', orderAmount: 150 },
  { storeType: '社区店', memberType: '老会员', orderAmount: 160 },
  { storeType: '社区店', memberType: '老会员', orderAmount: 180 },
  { storeType: '社区店', memberType: '老会员', orderAmount: 200 },
  { storeType: '社区店', memberType: '老会员', orderAmount: 220 },
  { storeType: '社区店', memberType: '老会员', orderAmount: 250 },
  { storeType: '社区店', memberType: '老会员', orderAmount: 280 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'density',
  data: {
    type: 'inline',
    value: data,
    transform: [
      {
        type: 'kde',
        field: 'orderAmount',
        // 同时按 x 字段与系列字段分组，否则并排形状会错位
        groupBy: ['storeType', 'memberType'],
        size: 24,
      },
    ],
  },
  encode: {
    x: 'storeType',
    y: 'y',
    size: 'size',
    series: 'memberType', // 决定同一 x 下的并排位置
    color: 'memberType',
  },
  scale: {
    color: { range: ['#5B8FF9', '#F6BD16'] },
  },
  style: { fillOpacity: 0.4, lineWidth: 1.5 },
  axis: {
    x: { title: '门店类型' },
    y: { title: '客单价（元）' },
  },
  legend: { color: { position: 'top' } },
});

chart.render();
