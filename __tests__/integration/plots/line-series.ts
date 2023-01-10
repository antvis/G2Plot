import { G2PlotLine } from '../../../src';

export function lineSeries() {
  return {
    type: 'view',
    height: 320,
    data: {
      type: 'fetch',
      value: 'data/year-value-category.json',
    },
    children: [
      {
        type: G2PlotLine,
        encode: {
          x: (d) => new Date(d.year),
          y: 'value',
          color: 'category',
        },
        scale: { x: { mask: 'YYYY-MM', nice: true } },
        axis: { y: { title: false } },
        style: {
          point: true,
          pointOpacity: (datum, i, data) =>
            filterPoint(data, datum, 'category'),
        },
      },
    ],
  };
}

export function filterPoint(data, datum, name) {
  // 找到当前点在当前系列的索引位置
  const idx = data
    .filter((d) => d[name] === datum[name])
    .findIndex((d) => d === datum);
  // 每 5 个点展示一次
  return idx % 5 ? 0 : 1;
}
