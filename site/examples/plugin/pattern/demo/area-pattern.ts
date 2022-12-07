import { Area } from '@antv/g2plot';

const data = [
  { country: 'Asia', year: '1750', value: 502 },
  { country: 'Asia', year: '1800', value: 635 },
  { country: 'Asia', year: '1850', value: 809 },
  { country: 'Asia', year: '1900', value: 5268 },
  { country: 'Asia', year: '1950', value: 4400 },
  { country: 'Asia', year: '1999', value: 3634 },
  { country: 'Asia', year: '2050', value: 947 },
  { country: 'Africa', year: '1750', value: 106 },
  { country: 'Africa', year: '1800', value: 107 },
  { country: 'Africa', year: '1850', value: 111 },
  { country: 'Africa', year: '1900', value: 1766 },
  { country: 'Africa', year: '1950', value: 221 },
  { country: 'Africa', year: '1999', value: 767 },
  { country: 'Africa', year: '2050', value: 133 },
  { country: 'Europe', year: '1750', value: 163 },
  { country: 'Europe', year: '1800', value: 203 },
  { country: 'Europe', year: '1850', value: 276 },
  { country: 'Europe', year: '1900', value: 628 },
  { country: 'Europe', year: '1950', value: 547 },
  { country: 'Europe', year: '1999', value: 729 },
  { country: 'Europe', year: '2050', value: 408 },
  { country: 'Oceania', year: '1750', value: 200 },
  { country: 'Oceania', year: '1800', value: 200 },
  { country: 'Oceania', year: '1850', value: 200 },
  { country: 'Oceania', year: '1900', value: 460 },
  { country: 'Oceania', year: '1950', value: 230 },
  { country: 'Oceania', year: '1999', value: 300 },
  { country: 'Oceania', year: '2050', value: 300 },
];

const pattern = ({ country }) => {
  if (country === 'Asia') {
    return {
      type: 'line',
      cfg: {
        lineWidth: 10,
        strokeOpacity: 0.6,
      },
    };
  } else if (country === 'Europe') {
    return {
      type: 'dot',
      cfg: {
        size: 10,
        padding: 5,
        fill: '#fff',
        fillOpacity: 0.8,
      },
    };
  }
};

const area = new Area('container', {
  data,
  xField: 'year',
  yField: 'value',
  seriesField: 'country',
  color: ['#82d1de', '#cb302d', '#e3ca8c'],
  areaStyle: {
    fillOpacity: 0.7,
  },
  meta: {
    year: {
      nice: true,
      range: [0, 1],
    },
  },
  smooth: true,
  yAxis: {
    label: {
      formatter: (value) => {
        return value * 100;
      },
    },
  },
  pattern,
});
area.render();
