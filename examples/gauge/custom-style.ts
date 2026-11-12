import { Chart } from '@antv/g2';

/**
 * 阈值配色与样式定制
 * 场景：需要分档预警的单指标，如服务可用性、健康度、评分等级
 * 要点：thresholds 按数值分档，段数 = thresholds.length = scale.color.range 长度；
 *       分档模式整条弧按区间着色、指针定位当前值（不再是「已完成/剩余」两段）；
 *       arcXxx 定制弧、pointerXxx 指针、pinXxx 轴心点、textXxx 中心文字
 */
const data = {
  metric: '服务可用性',
  value: 96.2,
  total: 100,
};

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'gauge',
  data: {
    value: {
      name: data.metric,
      target: data.value,
      total: data.total,
      // 三档：0~90 危险、90~95 预警、95~100 健康
      thresholds: [90, 95, 100],
    },
  },
  scale: {
    color: { range: ['#F4664A', '#FAAD14', '#30BF78'] },
  },
  // 加厚弧：innerRadius / outerRadius 控制环的粗细
  coordinate: {
    type: 'radial',
    innerRadius: 0.72,
    outerRadius: 0.92,
    startAngle: (-11 / 10) * Math.PI,
    endAngle: (1 / 10) * Math.PI,
  },
  style: {
    // 分段之间的白色描边，让三档分界更清晰
    arcStroke: '#fff',
    arcLineWidth: 2,
    // 指针与轴心
    pointerStroke: '#1d1d1d',
    pointerLineWidth: 3,
    pinR: 8,
    pinFill: '#1d1d1d',
    // 中心文字
    textContent: (target: number) => `${target}%`,
    textFontSize: 30,
    textFill: '#1d1d1d',
    textY: '74%',
  },
  axis: false,
  legend: false,
});

chart.render();
