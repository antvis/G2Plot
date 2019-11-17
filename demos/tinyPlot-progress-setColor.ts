// 迷你图表-进度条:配置进度条颜色
/* tslint:disable */
const progress = new g2plot.Progress(document.getElementById('canvas'), {
  width: 200,
  height: 100,
  percent: 0.3,
  // color:'#2B46DB', //颜色设置为单值时配置当前进度的颜色
  color: ['#E12B21', '#60ADA5'], // 颜色设置为数组时同时配置当前进度和背景的颜色
});
progress.render();

// 作为模块 避免变量冲突
export {};
