// 水波图

const liquidPlot = new g2plot.Liquid(document.getElementById('canvas'), {
  width: 650,
  height: 450,
  min: 0,
  max: 10000,
  value: 5639,
  statistic: {
    formatter: (value) => ((100 * value) / 10000).toFixed(1) + '%',
  },
});
liquidPlot.render();

// 作为模块 避免变量冲突
export {};
