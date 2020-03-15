import { OverlappedComboPlot } from '@antv/g2plot';

fetch('../data/weather.json')
  .then((res) => res.json())
  .then((data) => {
    const comboPlot = new OverlappedComboPlot(document.getElementById('container'), {
      legend: {
        visible: true,
      },
      xAxis: {
        visible: true,
        tickCount: 5,
      },
      yAxis: {
        visible: true,
        colorMapping: false,
      },
      layers: [
        {
          type: 'line',
          name: 'wind',
          data,
          xField: 'date',
          yField: 'wind',
          xAxis: {
            type: 'cat',
            tickCount: 5,
          },
          color: '#7fb170',
          smooth: true,
        },
        {
          type: 'line',
          name: 'temprature',
          data,
          xField: 'date',
          yField: 'temp_min',
          color: '#e04e47',
          smooth: true,
        },
      ],
    });
    comboPlot.render();
  });
