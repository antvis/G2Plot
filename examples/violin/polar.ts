import { Chart } from '@antv/g2';

/**
 * 极坐标小提琴图
 * 场景：在环形布局中对比不同门店的订单配送时长分布
 * 要点：在 view 上设置 polar 坐标；density + KDE 与 violin boxplot 的组合保持不变
 */
const deliveryTimesByStore = {
  城东店: [12, 14, 15, 16, 17, 18, 18, 19, 20, 20, 21, 22, 23, 24, 25, 26, 28, 30, 32, 34, 36, 40, 44, 48],
  城西店: [16, 17, 18, 19, 20, 21, 22, 22, 23, 24, 25, 26, 27, 28, 30, 31, 33, 35, 37, 39, 42, 45, 50, 55],
  城南店: [10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 25, 26, 27, 28, 29, 30, 32, 34, 35, 36, 38, 40, 42],
};

const data = Object.entries(deliveryTimesByStore).flatMap(
  ([storeName, deliveryTimes]) =>
    deliveryTimes.map((deliveryMinutes) => ({ storeName, deliveryMinutes })),
);

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  coordinate: { type: 'polar' },
  legend: false,
  children: [
    {
      type: 'density',
      data: {
        transform: [
          {
            type: 'kde',
            field: 'deliveryMinutes',
            groupBy: ['storeName'],
            size: 30,
            as: ['densityValue', 'densitySize'],
          },
        ],
      },
      encode: {
        x: 'storeName',
        y: 'densityValue',
        size: 'densitySize',
        series: 'storeName',
        color: 'storeName',
      },
      style: { fillOpacity: 0.65 },
      tooltip: false,
    },
    {
      type: 'boxplot',
      encode: {
        x: 'storeName',
        y: 'deliveryMinutes',
        series: 'storeName',
        color: 'storeName',
        shape: 'violin',
      },
      style: { opacity: 0.5, strokeOpacity: 0.8, point: false },
    },
  ],
});

chart.render();
