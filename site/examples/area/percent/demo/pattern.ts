import { Area } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/67ef5751-b228-417c-810a-962f978af3e7.json')
  .then((res) => res.json())
  .then((data) => {
    const area = new Area('container', {
      data,
      xField: 'year',
      yField: 'value',
      seriesField: 'country',
      color: ['#82d1de', '#cb302d', '#e3ca8c'],
      areaStyle: {
        fillOpacity: 0.7,
      },
      appendPadding: 10,
      isPercent: true,
      yAxis: {
        label: {
          formatter: (value) => {
            return value * 100;
          },
        },
      },
      pattern: {
        type: 'line',
      },
    });
    area.render();
  });
