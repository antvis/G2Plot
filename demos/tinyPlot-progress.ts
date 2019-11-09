// 迷你图表-进度条

const progress = new g2plot.Progress(document.getElementById('canvas'), {
  width: 200,
  height: 100,
  percent: 0.3,
});
progress.render();

// 作为模块 避免变量冲突
export {}
