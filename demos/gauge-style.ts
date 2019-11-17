// 仪表盘:配置样式

const gaugePlot = new g2plot.Gauge(document.getElementById('canvas'), {
  value: 64,
  min: 0,
  max: 100,
  range: [20, 40, 60, 80],
  gaugeStyle: {
    colors: ['#1890FF', '#2FC25B', '#FACC14', '#223273', '#8543E0', '#13C2C2', '#3436C7', '#F04864'],
    // stripWidth: 30,
    // stripBackColor: '#ddd',
    // tickInterval: 20,
    // tickLabelPos: 'inner',
    // tickLabelSize: 16,
    // tickLabelColor: '#aaa',
    // tickLineColor: '#aaa',
    // subTickCount: 4,
    pointerColor: '#1890FF',
  },
});
gaugePlot.render();

// 作为模块 避免变量冲突
export {};
