import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
  .then((res) => res.json())
  .then((data) => {
    const line = new Line('container', {
      data,
      padding: 'auto',
      xField: 'Date',
      yField: 'scales',
      point: {
        style: {
          fillOpacity: 0,
          strokeOpacity: 0,
          size: 6,
        },
      },
    });

    line.render();

    let id = 0;
    line.on('point:click', (evt) => {
      line.addAnnotations([
        {
          type: 'dataMarker',
          // 通过 源数据 匹配位置
          position: evt.data.data,
          content: '辅助点',
          text: { content: '辅助点' },
          // 可以使用随机 id
          id: `${id++}`,
        },
      ]);
    });

    line.on('annotation:click', (evt) => {
      const component = evt.gEvent.delegateObject.component;
      // 匹配到 辅助点，进行删除
      if (component.get('type') === 'text') {
        line.removeAnnotations([{ id: component.get('id') }]);
      }
    });
  });
