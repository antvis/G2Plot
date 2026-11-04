import { Chart } from '@antv/g2';

/**
 * 带日号标签的月历图
 * 场景：在月历中展示每日营收，同时保留日期位置与精确数值提示
 * 要点：星期列/周行 + dayOfMonth 标签；自定义色阶，深色格子切换白色文字
 */
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const millisecondsPerDay = 24 * 60 * 60 * 1000;
const monthStart = Date.UTC(2026, 3, 1);
const firstWeekdayOffset = (new Date(monthStart).getUTCDay() + 6) % 7;
const dailyRevenue = [
  1250, 1380, 1460, 980, 760, 1520, 1680, 1740, 1320, 890, 680, 1810, 1950,
  1880, 1600, 1020, 720, 2050, 2180, 1960, 1710, 1150, 780, 2240, 2320, 2100,
  1860, 1280, 860, 2400,
];

const data = dailyRevenue.map((revenue, dayOffset) => {
  const date = new Date(monthStart + dayOffset * millisecondsPerDay);
  const weekdayIndex = (date.getUTCDay() + 6) % 7;

  return {
    date: date.toISOString().slice(0, 10),
    dayOfMonth: dayOffset + 1,
    weekIndex: Math.floor((firstWeekdayOffset + dayOffset) / 7),
    weekday: weekdays[weekdayIndex],
    revenue,
  };
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'cell',
  data,
  title: { title: '2026 年 4 月每日营收', subtitle: '单位：元' },
  encode: { x: 'weekday', y: 'weekIndex', color: 'revenue' },
  scale: {
    x: { type: 'band', domain: weekdays },
    y: { type: 'band' },
    color: {
      type: 'sequential',
      range: ['#f5f9ff', '#c6dbef', '#6baed6', '#2171b5', '#08306b'],
      domain: [0, 2400],
    },
  },
  labels: [
    {
      text: 'dayOfMonth',
      style: {
        fontSize: 11,
        fill: (d: { revenue: number }) =>
          d.revenue >= 1900 ? '#fff' : '#333',
      },
    },
  ],
  style: { inset: 3, radius: 3 },
  axis: { x: { title: null }, y: false },
  legend: { color: { position: 'bottom' } },
  tooltip: {
    title: 'date',
    items: [
      {
        field: 'revenue',
        name: '营收',
        valueFormatter: (value) => `${Number(value).toLocaleString()} 元`,
      },
    ],
  },
});

chart.render();
