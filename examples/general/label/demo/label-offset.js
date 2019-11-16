import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/salesTrend.json')
  .then((res) => res.json())
  .then((data) => {
    const linePlot = new Line(document.getElementById('container'), {
      title: {
        visible: true,
        text: '图形标签文本偏移量',
      },
      forceFit: true,
      data,
      padding: 'auto',
      xField: 'date',
      yField: 'buyin',
      xAxis: {
        visible: true,
        type: 'dateTime',
        tickCount: 5,
      },
      yAxis: {
        visible: true,
      },
      label: {
        visible: true,
        offset: 20,
        style: {
          fill: '#0b53b0',
        },
      },
      responsive: true,
    });

    linePlot.render();
  });
