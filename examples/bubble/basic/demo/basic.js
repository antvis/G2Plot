import { Bubble } from '@antv/g2plot';

fetch('../data/smoking-rate.json')
  .then((res) => res.json())
  .then((data) => {
    const bubblePlot = new Bubble(document.getElementById('container'), {
      data,
      xField: 'change in female rate',
      yField: 'change in male rate',
      sizeField: 'pop',
      pointSize: [4, 30],
      colorField: 'continent',
      color: ['#ffd500', '#82cab2', '#193442', '#d18768', '#7e827a'],
      xAxis: {
        visible: true,
        max: 5,
        min: -25,
      },
    });
    bubblePlot.render();
  });
