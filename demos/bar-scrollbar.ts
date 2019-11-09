// 条形图滚动条

$.get('data/sales.json', (data) => {
  const column = new g2plot.Bar(document.getElementById('canvas'), {
    padding: 'auto',
    width: 800,
    height: 600,
    data,
    xField: '销售额',
    xAxis: {
      visible: true,
      autoHideLabel: true,
    },
    yField: '城市',
    yAxis: {
      visible: true,
      autoHideLabel: true,
    },
    interactions: [
      {
        type: 'scrollbar',
        cfg: {
          type: 'vertical',
        },
      },
    ],
  });
  column.render();
});

// 作为模块 避免变量冲突
export {}
