import { Chart } from '@antv/g2';

/**
 * 基础小提琴图
 * 场景：对比多个客服团队的响应时间分布，同时查看中位数与四分位数
 * 要点：density + KDE 绘制密度轮廓，叠加 shape 为 violin 的 boxplot 显示统计摘要
 */
const responseTimesByTeam = {
  售前咨询: [3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 8, 8, 9, 9, 10, 11, 12, 13, 14, 16, 18, 20, 24],
  售后支持: [6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 14, 15, 16, 17, 18, 20, 22, 25, 28, 32, 38],
  技术支持: [8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 42, 46, 52],
};

const data = Object.entries(responseTimesByTeam).flatMap(
  ([supportTeam, responseTimes]) =>
    responseTimes.map((responseMinutes) => ({ supportTeam, responseMinutes })),
);

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  axis: {
    x: { title: '支持团队' },
    y: { title: '响应时间（分钟）' },
  },
  legend: false,
  children: [
    {
      type: 'density',
      data: {
        transform: [
          {
            type: 'kde',
            field: 'responseMinutes',
            groupBy: ['supportTeam'],
            size: 30,
            as: ['densityValue', 'densitySize'],
          },
        ],
      },
      encode: {
        x: 'supportTeam',
        y: 'densityValue',
        size: 'densitySize',
        series: 'supportTeam',
        color: 'supportTeam',
      },
      style: { fillOpacity: 0.65 },
      tooltip: false,
    },
    {
      type: 'boxplot',
      encode: {
        x: 'supportTeam',
        y: 'responseMinutes',
        series: 'supportTeam',
        color: 'supportTeam',
        shape: 'violin',
      },
      style: { opacity: 0.5, strokeOpacity: 0.8, point: false },
    },
  ],
});

chart.render();
