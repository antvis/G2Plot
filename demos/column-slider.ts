// 柱形图缩略轴

$.get('data/sales.json', (data) => {
  const column = new g2plot.Column(document.getElementById('canvas'), {
    padding: 'auto',
    width: 800,
    height: 600,
    data,
    xField: '城市',
    xAxis: {
      visible: true,
      autoHideLabel: true,
    },
    yField: '销售额',
    interactions: [
      {
        type: 'slider',
        cfg: {
          start: 0,
          end: 1,
        },
      },
    ],
  });
  column.render();
});

// 作为模块 避免变量冲突
export {};
