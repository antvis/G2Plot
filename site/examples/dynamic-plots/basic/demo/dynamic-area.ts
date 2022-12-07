import { Area } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
  .then((res) => res.json())
  .then((originalData) => {
    let cnt = 2;
    const area = new Area('container', {
      data: originalData.slice(0, cnt),
      xField: 'timePeriod',
      yField: 'value',
      xAxis: {
        range: [0, 1],
      },
    });
    area.render();

    const interval = setInterval(() => {
      if (cnt === originalData.length) {
        clearInterval(interval);
      } else {
        cnt += 1;
        area.changeData(originalData.slice(0, cnt));
      }
    }, 400);
  });
