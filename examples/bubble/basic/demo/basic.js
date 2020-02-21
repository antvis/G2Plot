import { Bubble } from '@antv/g2plot';

fetch('../data/smoking-rate.json')
  .then((res) => res.json())
  .then((data) => {
    const filterData = data.filter((item) => {
      return item['change in male rate'] !== 'NA';
    });
    const bubblePlot = new Bubble(document.getElementById('container'), {
      data: filterData,
      xField: 'change in female rate',
      yField: 'change in male rate',
      sizeField: 'pop',
      pointSize: [4, 30],
      colorField: 'continent',
      color: ['#ffd500', '#82cab2', '#193442', '#d18768', '#7e827a'],
      pointStyle: {
        stroke: '#777777',
        lineWidth: 1,
        opacity: 0.8,
      },
      xAxis: {
        visible: true,
        max: 5,
        min: -25,
      },
    });
    bubblePlot.render();
  });
