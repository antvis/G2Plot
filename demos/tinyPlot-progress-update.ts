// 迷你图表-进度条:更新

const progress = new g2plot.Progress(document.getElementById('canvas'), {
  width: 200,
  height: 100,
  percent: 0.5,
});
progress.render();
progress.update(0.7);

// 作为模块 避免变量冲突
export {}
