import { Chart } from '@antv/g2';

/**
 * 大数据抽稀：365 天数据按周聚合
 * 场景：数据点太多（数百上千）直接画太密，需要降采样
 *
 * 要点（推荐做法 = 数据预处理聚合）：
 * - 最稳妥的抽稀是在渲染前对数据聚合（按周/月取平均），不依赖 transform 行为
 * - 若用 transform: [{ type: 'sample', strategy: 'lttb' }]，注意 lttb 要求
 *   x/y 都是数值：x 是字符串日期（如 '2024-01-01'）时 X*1 = NaN，采样结果错乱，
 *   会导致渲染报错（Cannot read properties of undefined）。此时应改用数值时间戳 x
 */

// 模拟 365 天每日数据
const daily = Array.from({ length: 365 }, (_, i) => {
  const date = new Date(2024, 0, 1 + i);
  return {
    date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate(),
    ).padStart(2, '0')}`,
    value: Number((50 + 30 * Math.sin(i / 18) + 15 * Math.sin(i / 5)).toFixed(1)),
  };
});

// 数据预处理：每 7 天聚合成一个点（取该周平均），365 → 约 52 个点
const weekly = [];
for (let i = 0; i < daily.length; i += 7) {
  const chunk = daily.slice(i, i + 7);
  const avg = chunk.reduce((s, d) => s + d.value, 0) / chunk.length;
  weekly.push({ date: chunk[0].date, value: Number(avg.toFixed(1)) });
}

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data: weekly,
  encode: { x: 'date', y: 'value' },
  axis: {
    x: { title: '日期（按周聚合）' },
    y: { title: '数值' },
  },
});

chart.render();
