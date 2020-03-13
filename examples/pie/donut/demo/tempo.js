import { Donut } from '@antv/g2plot';
import insertCss from 'insert-css';

insertCss(`
.ring-guide-name {
    color: white;
}

.ring-guide-value {
    color: white!important;
    opacity: 0.7
}

`);

const data = [
  {
    type: '分类一',
    value: 15,
  },
  {
    type: '分类二',
    value: 14,
  },
  {
    type: '分类三',
    value: 18,
  },
  {
    type: '分类四',
    value: 27,
  },
];

const donutPlot = new Donut(document.getElementById('container'), {
  forceFit: true,
  radius: 0.8,
  padding: 'auto',
  data,
  color: ['#5a93fc', '#90b6fd', '#c8dbfe', '#ffffff'],
  angleField: 'value',
  colorField: 'type',
  statistic: {
    visible: true,
    content: {
      value: '32%',
      name: 'Texi & delivery',
    },
  },
  label: {
    visible: false,
  },
  legend: {
    visible: true,
    position: 'bottom-center',
  },
  pieStyle: (v) => {
    if (v === '分类四') {
      return {
        shadowColor: '#4d4d4d',
        shadowBlur: 50,
        shadowOffsetX: -15,
      };
    }
    return {};
  },
});

donutPlot.render();
