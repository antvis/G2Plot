import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
  .then((res) => res.json())
  .then((data) => {
    const line = new Line('container', {
      data,
      padding: 'auto',
      xField: 'Date',
      yField: 'scales',
      xAxis: {
        type: 'timeCat',
        tickCount: 5,
      },
    });

    line.render();
    let cnt = 0;
    let smooth = false;
    const interval = setInterval(() => {
      if (cnt < 5) {
        smooth = !smooth;
        cnt += 1;
        line.update({ smooth });
      } else {
        clearInterval(interval);
      }
    }, 1000);
  });
