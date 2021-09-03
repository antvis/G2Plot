import { Venn } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/yzC3ZiBbhM/venn-data.json')
  .then((data) => data.json())
  .then((data) => {
    const sum = data.reduce((a, b) => a + b.size, 0);
    const toPercent = (p) => `${(p * 100).toFixed(2)}%`;
    const plot = new Venn('container', {
      appendPadding: [10, 20, 40, 20],
      data,
      pointStyle: { fillOpacity: 0.85 },
      color: ['#9DF5CA', '#61DDAA', '#42C090'],
      label: {
        style: {
          lineHeight: 18,
        },
        formatter: (datum) => {
          return datum.sets.length > 1
            ? `${datum.size} (${toPercent(datum.size / sum)})`
            : `${datum.id}\n${datum.size} (${toPercent(datum.size / sum)})`;
        },
      },
      tooltip: {
        fields: ['sets', 'size'],
        formatter: (datum) => ({ name: datum.sets.join('&'), value: datum.size }),
      },
    });
    plot.render();
  });
