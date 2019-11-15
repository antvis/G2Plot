import { StackArea } from '@antv/g2plot';

fetch('../data/oil.json')
  .then((res) => res.json())
  .then((data) => {
    const areaPlot = new StackArea(document.getElementById('container'), {
      title: {
        visible: true,
        text: '堆叠面积图-areaLabel',
      },
      description: {
        visible: true,
        text:
          '堆叠面积图中，将label type设置为area时，label显示在堆叠区域内，使用户能够更容易的通过视觉将label和对应图形产生联系。autoScale配置项设置为true时，label会自适应堆叠区域的大小。',
      },
      data,
      xField: 'date',
      yField: 'value',
      stackField: 'country',
      xAxis: {
        type: 'dateTime',
        tickCount: 5,
      },
      label: {
        visible: true,
        type: 'area',
        autoScale: true,
      },
      legend: {
        visible: true,
        position: 'right-top',
      },
      responsive: true,
    });
    areaPlot.render();
  });
