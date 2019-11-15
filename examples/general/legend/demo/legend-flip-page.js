import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/fertility.json')
  .then((res) => res.json())
  .then((data) => {
    const linePlot = new Line(document.getElementById('container'), {
      title: {
        visible: true,
        text: '设置legend是否翻页',
      },
      description: {
        visible: true,
        text: '当legend数量过多时，默认进行翻页，给图表留出更多的展示空间。此功能可以通过配置项关闭。',
      },
      forceFit: true,
      data,
      padding: 'auto',
      xField: 'year',
      yField: 'value',
      seriesField: 'country',
      smooth: true,
      xAxis: {
        visible: true,
        type: 'time',
      },
      legend: {
        visible: true,
        flipPage: false,
      },
    });

    linePlot.render();
  });
