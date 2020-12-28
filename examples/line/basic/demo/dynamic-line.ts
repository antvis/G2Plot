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

    let year = 2017;
    let month = 2;
    const interval = setInterval(() => {
      if (year > 2211) {
        clearInterval(interval);
      }
      month = (month + 1) % 12;
      year += Math.ceil(month / 12);
      line.changeData([...line.options.data, { Date: `${year}-${month}`, scales: 1300 * Math.random() + 500 }]);
    }, 500);
  });
