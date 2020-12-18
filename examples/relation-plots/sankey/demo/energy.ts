import { Sankey } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/fa3414cc-75ed-47b4-8306-f2ffe8c40127.json')
  .then((res) => res.json())
  .then((data) => {
    const sankey = new Sankey('container', {
      data,
      sourceField: 'source',
      targetField: 'target',
      weightField: 'value',
      color: ['red', 'green', 'yellow'],
      edgeStyle: {
        fill: '#ccc',
        fillOpacity: 0.4,
      },
    });

    sankey.render();
  });
