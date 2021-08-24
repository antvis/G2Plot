import { Heatmap } from '@antv/g2plot';

const pattern = ({ value }) => {
  if (value >= 90) {
    return {
      type: 'line',
      cfg: {
        spacing: 2,
        lineWidth: 6,
        strokeOpacity: 0.9,
      },
    };
  } else if (70 <= value && value < 90) {
    return {
      type: 'line',
      cfg: {
        spacing: 8,
        lineWidth: 1,
        strokeOpacity: 0.9,
      },
    };
  }
  if (60 <= value && value < 70) {
    return {
      type: 'dot',
      cfg: {
        size: 2,
        padding: 5,
        fillOpacity: 0.9,
      },
    };
  }
};

fetch('https://gw.alipayobjects.com/os/bmw-prod/68d3f380-089e-4683-ab9e-4493200198f9.json')
  .then((res) => res.json())
  .then((data) => {
    const heatmapPlot = new Heatmap(document.getElementById('container'), {
      data,
      xField: 'name',
      yField: 'country',
      color: '#8E0C24',
      colorField: 'value',
      pattern,
    });

    heatmapPlot.render();
  });
