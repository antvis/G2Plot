import { Line } from '@antv/g2plot';

fetch('../../data/GDP.json')
  .then((res) => res.json())
  .then((data) => {
    const linePlot = new Line(document.getElementById('container'), {
      title: {
        visible: true,
        text: '2000 ~ 2018 年各国家 GDP 趋势对比',
      },
      description: {
        visible: true,
        text: '图形标签 (label) 位于折线尾部，用于标注整根折线，并有带有排名的含义在其中。',
      },
      padding: [20, 100, 30, 80],
      forceFit: true,
      data,
      xField: 'year',
      yField: 'gdp',
      seriesField: 'name',
      xAxis: {
        type: 'dateTime',
        autoHideLabel: true,
      },
      yAxis: {
        label: {
          // 数值格式化为千分位
          formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
        },
      },
      legend: {
        visible: false,
      },
      label: {
        visible: true,
        type: 'line',
      },
    });

    linePlot.render();
  });
