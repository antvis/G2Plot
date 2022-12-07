import { Column } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/P14mCvkybz/large-datra.json')
  .then((data) => data.json())
  .then((data) => {
    const plot = new Column('container', {
      data,
      xField: 'product_box',
      yField: 'value',
      seriesField: 'province',
      isGroup: 'true',
      legend: {
        flipPage: true,
        maxRow: 2,
        marker: {
          // 把 marker 从 square 变成线条
          symbol: (x, y, r) => {
            return [
              ['M', x - r / 2, y],
              ['L', x + r / 2, y],
            ];
          },
          style: (oldStyle) => {
            return {
              ...oldStyle,
              r: 4,
              lineWidth: 2,
              // square marker 只有填充色，赋给 line 的 stroke
              stroke: oldStyle.stroke || oldStyle.fill,
            };
          },
        },
      },
    });

    plot.render();
  });
