import { Line } from '@antv/g2plot';

const data = [
  { Date: '2021-10-01', rating: 1 },
  { Date: '2021-10-02', rating: 3 },
  { Date: '2021-10-03', rating: 8 },
  { Date: '2021-10-04', rating: 12 },
  { Date: '2021-10-05', rating: 30 },
];

const line = new Line('container', {
  data,
  padding: 'auto',
  xField: 'Date',
  yField: 'rating',
  reflect: 'y',
  xAxis: {
    // because coordinate is reflectY
    position: 'top',
  },
});

line.render();
