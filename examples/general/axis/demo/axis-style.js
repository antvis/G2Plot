import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/fertility.json')
  .then((res) => res.json())
  .then((data) => {
    const linePlot = new Line(document.getElementById('container'), {
      title: {
        visible: true,
        text: '配置坐标轴样式',
      },
      description: {
        visible: true,
      },
      forceFit: true,
      data,
      padding: 'auto',
      xField: 'year',
      yField: 'value',
      seriesField: 'country',
      smooth: true,
      xAxis: {
        visible: true,
        type: 'time',
        grid: {
          visible: true,
          style: {
            stroke: '#e3e8ec',
            lineWidth: 1,
            lineDash: [0, 0],
          },
        },
        line: {
          visible: true,
          style: {
            stroke: 'black',
            lineWidth: 1,
          },
        },
        tickLine: {
          visible: true,
          style: {
            stroke: 'black',
            lineWidth: 1,
          },
        },
        label: {
          visible: true,
          style: {
            fill: 'black',
          },
        },
      },
      yAxis: {
        visible: true,
        grid: {
          visible: true,
          style: {
            stroke: '#e3e8ec',
            lineWidth: 1,
            lineDash: [0, 0],
          },
        },
        line: {
          visible: true,
          style: {
            stroke: 'black',
            lineWidth: 1,
          },
        },
        tickLine: {
          visible: true,
          style: {
            stroke: 'black',
            lineWidth: 1,
          },
        },
        label: {
          visible: true,
          style: {
            fill: 'black',
          },
        },
      },
    });

    linePlot.render();
  });
