import { Chart } from '@antv/g2';

/**
 * 多指标仪表盘并排
 * 场景：一屏内对比少量同量纲指标（资源使用率、多个渠道达成率）
 * 要点：一个 gauge 只能画一个指标；多个指标用 spaceFlex 组合多个 gauge 子图；
 *       textContent 通过闭包拼接 item.metric，避免只剩百分比而无法辨认；
 *       子图之间共享色彩语义（同色 = 同状态）时更易读
 */
const data = [
  { metric: 'CPU 使用率', completionRate: 72, target: 100 },
  { metric: '内存使用率', completionRate: 58, target: 100 },
  { metric: '磁盘使用率', completionRate: 91, target: 100 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'spaceFlex',
  children: data.map((item) => ({
    type: 'gauge',
    data: {
      value: {
        name: item.metric,
        target: item.completionRate,
        total: item.target,
      },
    },
    scale: {
      color: { range: ['#5B8FF9', '#EEF1F6'] },
    },
    style: {
      textContent: (target: number, total: number) =>
        `${((target / total) * 100).toFixed(0)}%\n${item.metric}`,
      textFontSize: 20,
      textY: '68%',
    },
    axis: false,
    legend: false,
  })),
});

chart.render();
