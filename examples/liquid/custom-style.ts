/**
 * 品牌样式水波图
 * 场景：监控大屏展示内存使用率，并定制波浪、外框、背景和中心百分比
 * 要点：fill/waveLength 控制波浪；background 控制底色；text.style.formatter 格式化中心文字
 */
import { Chart } from '@antv/g2';

const memoryUsageRate = 0.683;

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'liquid',
  data: memoryUsageRate,
  style: {
    fill: '#5B8FF9',
    fillOpacity: 0.85,
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 128,
    background: {
      fill: '#E8F0FE',
    },
    text: {
      style: {
        fontSize: 32,
        fontWeight: 'bold',
        fill: '#10239E',
        formatter: (value: number) => `${(value * 100).toFixed(1)}%`,
      },
    },
  },
  axis: false,
  legend: false,
  tooltip: false,
});

chart.render();
