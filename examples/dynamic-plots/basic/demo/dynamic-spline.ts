import { Line } from '@antv/g2plot';

function getData() {
  // generate an array of random data
  const data = [];
  const time = new Date().getTime();

  for (let i = -19; i <= 0; i += 1) {
    data.push({
      x: time + i * 1000,
      y: Math.random() + 0.2,
    });
  }
  return data;
}

const line = new Line('container', {
  data: getData(),
  padding: 'auto',
  xField: 'x',
  yField: 'y',
  xAxis: {
    type: 'time',
    mask: 'HH:MM:ss',
  },
  smooth: true,
  point: {},
});

line.render();

setInterval(() => {
  const x = new Date().getTime(), // current time
    y = Math.random() + 0.2;
  const newData = line.options.data.slice(1).concat({ x, y });
  line.changeData(newData);
}, 1000);
