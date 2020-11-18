import { Funnel } from '@antv/g2plot';

const data = [
  { stage: '简历筛选', number: 253 },
  { stage: '初试人数', number: 151 },
  { stage: '复试人数', number: 113 },
  { stage: '录取人数', number: 87 },
  { stage: '入职人数', number: 59 },
];

const divStyles = {
  position: 'absolute',
  background: '#fff',
  boxShadow: 'rgb(174, 174, 174) 0px 0px 10px',
  borderRadius: '4px',
};

const setStyles = (container, styles) => {
  for (const key in styles) {
    container.style[key] = styles[key];
  }
};

const funnelPlot = new Funnel('container', {
  data: data,
  xField: 'stage',
  yField: 'number',
  legend: false,
  tooltip: {
    follow: true,
    enterable: true,
    offset: 5,
    customContent: (value, items) => {
      console.log(value, items);
      const container = document.createElement('div');
      container.innerText = 'hello';
      setStyles(container, divStyles);
      return container;
    },
  },
});

funnelPlot.render();
