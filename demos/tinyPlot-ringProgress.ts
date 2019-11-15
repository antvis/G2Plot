// 迷你图表-环形进度条

const progress = new g2plot.RingProgress(document.getElementById('canvas'), {
  width: 200,
  height: 100,
  percent: 0.3,
  color: '#2B46DB',
});
progress.render();
progress.update(0.5);

// 作为模块 避免变量冲突
export {};
