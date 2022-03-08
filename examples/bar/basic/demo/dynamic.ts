import { Bar } from '@antv/g2plot';

// 每次动画时间 ms
const UPDATE_TIME = 1000;
let year = 1981;

const color = {
  type1: '#5B8FF9',
  type2: '#61DDAA',
  type3: '#65789B',
  type4: '#F6BD16',
  type5: '#7262fd',
};

let data = [
  { year: `${year}年`, value: 328, type: 'type1' },
  { year: `${year}年`, value: 252, type: 'type2' },
  { year: `${year}年`, value: 61, type: 'type3' },
  { year: `${year}年`, value: 45, type: 'type4' },
  { year: `${year}年`, value: 30, type: 'type5' },
];

const bar = new Bar('container', {
  data,
  xField: 'value',
  yField: 'type',
  seriesField: 'type',
  padding: [0, 40, 0, 0],
  legend: {
    position: 'top-left',
  },
  label: {
    position: 'right',
  },
  legend: false,
  color: ({ type }) => color[type],
  annotations: [
    {
      type: 'text',
      position: ['max', 'max'],
      content: (d) => d[0]['year'],
      offsetX: -100,
      style: {
        fill: '#ccc',
        fontSize: '25',
      },
    },
  ],
});

bar.render();

function updateData() {
  setTimeout(() => {
    year++;
    data = data.map(({ type, value }) => ({
      type,
      year: `${year}年`,
      value: value + Math.floor(Math.random() * 50),
    }));

    bar.changeData(data.sort((a, b) => b.value - a.value));

    if (year !== 2021) {
      updateData();
    }
  }, UPDATE_TIME);
}

updateData();
