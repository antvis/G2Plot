import { Scatter } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/0b37279d-1674-42b4-b285-29683747ad9a.json')
  .then((res) => res.json())
  .then((data) => {
    const scatterPlot = new Scatter('container', {
      appendPadding: 30,
      data,
      xField: 'change in female rate',
      yField: 'change in male rate',
      sizeField: 'pop',
      colorField: 'continent',
      color: ['#ffd500', '#82cab2', '#193442', '#d18768', '#7e827a'],
      size: [4, 30],
      shape: 'circle',
      pointStyle: {
        fillOpacity: 0.8,
      },
      xAxis: {
        min: -25,
        max: 5,
        grid: {
          line: {
            style: {
              stroke: '#eee',
            },
          },
        },
      },
      quadrant: {
        xBaseline: 0,
        yBaseline: 0,
        labels: [
          {
            content: 'Male decrease,\nfemale increase',
          },
          {
            content: 'Female decrease,\nmale increase',
          },
          {
            content: 'Female & male decrease',
          },
          {
            content: 'Female &\n male increase',
          },
        ],
      },
    });
    scatterPlot.render();
  });
