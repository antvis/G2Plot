import { StackArea } from '@antv/g2plot';

fetch('../data/oil.json')
  .then((res) => res.json())
  .then((data) => {
    const areaPlot = new StackArea(document.getElementById('container'), {
      title: {
        visible: true,
        text: '堆叠面积图 - lineLabel',
      },
      description: {
        visible: true,
        text: '当label类型设置为line时，label与面积区域尾端顶部对齐。',
      },
      padding: [20, 100, 100, 50],
      data,
      xField: 'date',
      yField: 'value',
      stackField: 'country',
      xAxis: {
        type: 'dateTime',
      },
      label: {
        visible: true,
        type: 'line',
      },
      responsive: true,
    });
    areaPlot.render();
  });
