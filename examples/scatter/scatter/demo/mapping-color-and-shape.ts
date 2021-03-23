import { Scatter } from '@antv/g2plot';
import { uniq } from '@antv/util';

fetch('https://gw.alipayobjects.com/os/antfincdn/rc7SYiIq8Z/scatter-color-shape.json')
  .then((data) => data.json())
  .then((data) => {
    const plot = new Scatter('container', {
      appendPadding: 10,
      data: [],
    });

    plot.update({
      data,
      xField: 'x',
      yField: 'y',
      colorField: 'city',
      shapeField: 'area',
      sizeField: 'value',
      size: [4, 8],
      color: ({ city }) => {
        // 推荐业务自己传入主题色，不需要从 chart 中获取
        const { colors10 } = plot.chart.getTheme();
        // custom colorMapping function
        const idx = data.map((d) => d.city).indexOf(city);
        return colors10[idx + 1];
      },
      shape: ({ area }) => {
        const shapes = ['circle', 'square', 'triangle', 'hexagon', 'diamond', 'bowtie'];
        const idx = uniq(data.map((d) => d.area)).indexOf(area);
        return shapes[idx] || 'circle';
      },
      yAxis: {
        nice: true,
        line: {
          style: {
            stroke: '#aaa',
          },
        },
      },
    });
  });
