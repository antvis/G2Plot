import { Facet } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json')
  .then((res) => res.json())
  .then((data) => {
    const plot = new Facet('container', {
      type: 'rect',
      fields: ['cut', 'clarity'],
      cols: 3, // 超过3个换行
      padding: [0, 10, 10],
      appendPadding: 30,
      data,
      axes: {},
      meta: {
        carat: {
          sync: true,
        },
        price: {
          sync: true,
        },
        cut: {
          // 设置 sync 同步之后，可以按照 'cut' 进行颜色映射分类
          sync: true,
        },
      },
      eachView: (view, f) => {
        return {
          type: 'scatter',
          options: {
            data: f.data,
            xField: 'carat',
            yField: 'price',
            colorField: 'cut',
            shape: 'circle',
            pointStyle: { fillOpacity: 0.3, stroke: null },
          },
        };
      },
    });
    plot.render();
  });
