// 堆叠条形图滚动条

$.get('data/subsales.json', (data) => {
  const column = new g2plot.StackBar(document.getElementById('canvas'), {
    padding: 'auto',
    width: 800,
    height: 600,
    data,
    yField: '城市',
    xField: '销售额',
    stackField: '细分',
    xAxis: {
      visible: true,
      autoHideLabel: true,
    },
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
