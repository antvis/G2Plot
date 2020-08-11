import { Calendar } from '@antv/g2plot';

fetch('../data/contributions.json')
  .then((res) => res.json())
  .then((data) => {
    const calendar = new Calendar(document.getElementById('container'), {
      title: {
        visible: true,
        text: 'GitHub contribution',
      },
      description: {
        visible: true,
        text: '853 contributions in the last year.',
      },
      width: 650,
      height: 300,
      data,
      dateField: 'date',
      valueField: 'commits',
      dateRange: ['2017-05-01', '2017-10-31'],
      colors: '#BAE7FF-#1890FF-#0050B3',
      padding: '0',
      xAxis: {
        title: {
          text: '月份',
        },
      },
      yAxis: {
        title: null,
      },
      label: {
        visible: true,
      },
    });

    calendar.render();
  });
