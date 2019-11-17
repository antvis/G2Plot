// 堆叠面积图滚动条

$.get('data/subsales.json', (data) => {
  const column = new g2plot.StackArea(document.getElementById('canvas'), {
    padding: 'auto',
    width: 800,
    height: 600,
    data,
    xField: '城市',
    yField: '销售额',
    stackField: '细分',
    xAxis: {
      visible: true,
      autoHideLabel: true,
    },
    interactions: [
      {
        type: 'scrollbar',
      },
    ],
  });
  column.render();
});

// 作为模块 避免变量冲突
export {};
