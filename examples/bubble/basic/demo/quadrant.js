import { Bubble } from '@antv/g2plot';

fetch('../data/smoking-rate.json')
  .then((res) => res.json())
  .then((data) => {
    const bubblePlot = new Bubble(document.getElementById('container'), {
      title: {
        visible: true,
        text: '为气泡图配置四象限',
      },
      data,
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
        visble: true,
        max: 5,
        min: -25,
      },
      tooltip: {
        visible: true,
        showTitle: true,
        titleField: 'continent',
      },
      quadrant: {
        visible: true,
        xBaseline: 0,
        yBaseline: 0,
        regionStyle: [
          { fill: '#d8d0c0', opacity: 0.2 },
          { fill: '#a3dda1', opacity: 0.1 },
          { fill: 'white', opacity: 0 },
          { fill: '#d8d0c0', opacity: 0.2 },
        ],
        label: {
          text: [
            'Female decrease,\nmale increase',
            'Female & male decrease',
            'Female &\n male increase',
            'Male decrease,\nfemale increase',
          ],
        },
      },
    });
    bubblePlot.render();
  });
