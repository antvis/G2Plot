// 仪表盘

const gaugePlot = new g2plot.Gauge(document.getElementById('canvas'), {
  value: 64,
  min: 0,
  max: 100,
  range: [20, 40, 60, 80],
});
gaugePlot.render();

// 作为模块 避免变量冲突
export {};
