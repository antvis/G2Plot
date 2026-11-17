/**
 * 自定义样式水波图
 * 场景：展示存储资源使用率，并匹配报表的品牌配色与文字精度
 * 要点：shape / fill / backgroundFill / outline* / wave* 定制外观；text* 定制中心文字
 */
import { Chart } from '@antv/g2';

const storageUsage = 0.68;

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'liquid',
  data: storageUsage,
  style: {
    shape: 'rect',
    fill: '#5AD8A6',
    fillOpacity: 0.85,
    backgroundFill: '#E8F5E9',
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 96,
    textText: `${(storageUsage * 100).toFixed(1)}%`,
    textFontSize: 28,
    textFontWeight: 'bold',
    textFill: '#237804',
  },
  axis: false,
  legend: false,
  tooltip: false,
});

chart.render();
