import { Bar, G2 } from '@antv/g2plot';

G2.registerAnimation('label-update', (element, animateCfg, cfg) => {
  const startX = element.attr('x');
  const startY = element.attr('y');
  // @ts-ignore
  const finalX = cfg.toAttrs.x;
  // @ts-ignore
  const finalY = cfg.toAttrs.y;
  const labelContent = element.attr('text');
  // @ts-ignore
  const finalContent = cfg.toAttrs.text;

  const distanceX = finalX - startX;
  const distanceY = finalY - startY;
  const numberDiff = +finalContent - +labelContent;

  element.animate((ratio) => {
    const positionX = startX + distanceX * ratio;
    const positionY = startY + distanceY * ratio;
    const text = (+labelContent + numberDiff * ratio).toFixed(0);

    return {
      x: positionX,
      y: positionY,
      text,
    };
  }, animateCfg);


});

// 每次动画时间 ms
const UPDATE_TIME = 1000;
let year = 1981;

const color = {
  type1: '#5B8FF9',
  type2: '#61DDAA',
  type3: '#65789B',
  type4: '#F6BD16',
  type5: '#7262fd',
  type6: '#9661BC',
  type7: '#DECFEA',
  type8: '#BBDEDE',
  type9: '#F08BB4',
  type10: '#FFE0ED',
};

let data = [
  { year: `${year}年`, value: 266, type: 'type1' },
  { year: `${year}年`, value: 252, type: 'type2' },
  { year: `${year}年`, value: 161, type: 'type3' },
  { year: `${year}年`, value: 100, type: 'type4' },
  { year: `${year}年`, value: 90, type: 'type5' },
  { year: `${year}年`, value: 88, type: 'type6' },
  { year: `${year}年`, value: 10, type: 'type7' },
  { year: `${year}年`, value: 5, type: 'type8' },
  { year: `${year}年`, value: 0, type: 'type9' },
  { year: `${year}年`, value: 0, type: 'type10' },
];

function processData(data) {
  return data.sort((a, b) => b.value - a.value).slice(0, 8);
}

const bar = new Bar('container', {
  data: processData(data),
  xField: 'value',
  yField: 'type',
  seriesField: 'type',
  padding: [10, 40, 20, 50],
  legend: false,
  label: {
    position: 'right',
    animate: {
      update: {
        animation: 'label-update',
        duration: UPDATE_TIME,
        easing: 'easeLinear',
      },
    },
  },
  yAxis: {
    animateOption: {
      update: {
        duration: 1000,
        easing: 'easeLinear',
      },
    },
    nice: false,
  },
  color: ({ type }) => color[type],
  animation: {
    update: {
      duration: UPDATE_TIME,
      easing: 'easeLinear',
    },
  },
  annotations: [
    {
      type: 'text',
      position: ['max', 'max'],
      content: (d) => d[0]['year'],
      offsetX: -150,
      style: {
        fill: '#ccc',
        fontSize: '45',
      },
      animate: false,
    },
    {
      type: 'text',
      position: ['end', 'end'],
      content: (data) => {
        let max = 0;
        data.forEach(d=>{
          max = max < d.value ? d.value : max;
        })
        return max;
      },
      offsetY: 14,
      style: {
        textAlign: 'center',
        fontSize: '12',
      },
      animate: false,
    },
    {
      type: 'line',
      start: ['start', 'end'],
      end: ['end', 'end'],
      style: {
        fill: '#ccc',
        fontSize: '45',
      },
    },
  ],
});

bar.render();

function updateData() {
  year++;
  data = data.map(({ type, value }) => ({
    type,
    year: `${year}年`,
    value: value + Math.floor(Math.random() * 100),
  }));

  setTimeout(() => {
    bar.changeData(processData(data));

    if (year !== 2021) {
      updateData();
    }
  }, UPDATE_TIME);
}

updateData();
