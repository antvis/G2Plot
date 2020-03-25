import { Line } from '@antv/g2plot';

const data = [
  { date: '2019-01-01', value: 3 },
  { date: '2019-02-01', value: 4 },
  { date: '2019-03-01', value: 3.5 },
  { date: '2019-04-01', value: 5 },
  { date: '2019-05-01', value: 4.9 },
  { date: '2019-06-01', value: 6 },
  { date: '2019-07-01', value: 7 },
  { date: '2019-08-01', value: 9 },
  { date: '2019-09-01', value: 3 },
  { date: '2019-10-01', value: 23 },
  { date: '2019-11-01', value: 6 },
  { date: '2019-12-01', value: 8 },
];

const generateStarPoints = (x, y, r) => {
  const points = [];
  for (let i = 0; i < 5; i++) {
    const x1 = r * Math.cos(((54 + i * 72) / 180) * Math.PI) + x;
    const y1 = r * Math.sin(((54 + i * 72) / 180) * Math.PI) + y;
    // 内接点
    const x2 = r * Math.cos(((18 + i * 72) / 180) * Math.PI) * 0.5 + x;
    const y2 = r * Math.sin(((18 + i * 72) / 180) * Math.PI) * 0.5 + y;

    points.push([x2, y2]);
    points.push([x1, y1]);
  }

  return points;
};

const linePlot = new Line(document.getElementById('container'), {
  title: {
    visible: true,
    text: '自定义标注点 symbol',
  },
  description: {
    visible: true,
    text: '内置 symbol 类型有：cross, hexagon, bowtie, tick, plus, hyphen, line',
  },
  forceFit: true,
  padding: 'auto',
  data,
  xField: 'date',
  yField: 'value',
  yAxis: {
    nice: true,
  },
  label: {
    visible: false,
  },
  markerPoints: [
    {
      visible: true,
      data: [{ value: 23 }],
      label: {
        visible: true,
        formatter: () => '最大值',
      },
      size: 12,
      style: {
        normal: { fill: 'rgba(255, 255, 0, 0.85)', stroke: 'rgba(0,0,0,0.65)', lineWidth: 1 },
      },
      symbol: (x, y, r) => {
        const points = generateStarPoints(x, y, r);
        const path = [];
        points.forEach((point, idx) => {
          path.push([idx === 0 ? 'M' : 'L', point[0], point[1]]);
        });
        path.push(['Z']);
        return path;
      },
      animation: {
        endState: { size: 4, opacity: 0.3 },
        animateCfg: {
          duration: 1500,
          easing: 'easeLinear',
          repeat: true,
          delay: 1200,
        },
      },
    },
  ],
});

linePlot.render();
