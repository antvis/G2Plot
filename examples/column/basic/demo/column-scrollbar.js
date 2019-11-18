import { Column } from '@antv/g2plot';

fetch('../data/sales.json')
  .then((res) => res.json())
  .then((data) => {
    const columnPlot = new Column(document.getElementById('container'), {
      title: {
        visible: true,
        text: '基础柱状图-滚动条',
      },
      description: {
        visible: true,
        text: '当数据过多时，推荐使用滚动条一次只浏览一部分数据。',
      },
      forceFit: true,
      data,
      padding: 'auto',
      data,
      xField: '城市',
      xAxis: {
        visible: true,
        autoHideLabel: true,
      },
      yAxis: {
        visible: true,
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
      yField: '销售额',
      interactions: [
        {
          type: 'scrollbar',
        },
      ],
    });
    columnPlot.render();

    window.__plot = columnPlot;
  });
