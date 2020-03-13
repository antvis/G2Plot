import { StackedArea } from '@antv/g2plot';

fetch('../data/emissions.json')
  .then((res) => res.json())
  .then((data) => {
    const plot = new StackedArea(document.getElementById('container'), {
      title: {
        visible: true,
        text: 'The causes of CO2 emissions',
      },
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      seriesField: 'category',
      color: ['#6897a7', '#8bc0d6', '#60d7a7', '#dedede', '#fedca9', '#fab36f', '#d96d6f'],
      xAxis: {
        type: 'time',
        mask: 'YYYY',
      },
      yAxis: {
        label: {
          // 数值格式化为千分位
          formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
      responsive: true,
    });

    plot.render();
  });
