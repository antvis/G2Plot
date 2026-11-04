import { Chart } from '@antv/g2';

/**
 * 基础年历热力图
 * 场景：展示全年每天的代码提交次数，快速定位活跃期与连续空白期
 * 要点：cell mark + 周列/星期行；使用 UTC 计算周索引，避免时区导致日期错位
 */
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const millisecondsPerDay = 24 * 60 * 60 * 1000;
const yearStart = Date.UTC(2025, 0, 1);
const firstWeekdayOffset = (new Date(yearStart).getUTCDay() + 6) % 7;

const data = Array.from({ length: 365 }, (_, dayOffset) => {
  const date = new Date(yearStart + dayOffset * millisecondsPerDay);
  const weekdayIndex = (date.getUTCDay() + 6) % 7;
  const isWeekend = weekdayIndex >= 5;

  return {
    date: date.toISOString().slice(0, 10),
    weekIndex: Math.floor((firstWeekdayOffset + dayOffset) / 7),
    weekday: weekdays[weekdayIndex],
    commitCount: isWeekend
      ? dayOffset % 3
      : (dayOffset * 7 + weekdayIndex) % 15,
  };
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'cell',
  data,
  encode: { x: 'weekIndex', y: 'weekday', color: 'commitCount' },
  scale: {
    x: { type: 'band' },
    y: { type: 'band', domain: weekdays },
    color: { type: 'sequential', palette: 'Greens', domain: [0, 14] },
  },
  style: { inset: 2, radius: 2 },
  axis: { x: { title: null, tickCount: 12 }, y: { title: null } },
  tooltip: {
    title: 'date',
    items: [
      {
        field: 'commitCount',
        name: '代码提交',
        valueFormatter: (value) => `${value} 次`,
      },
    ],
  },
});

chart.render();
