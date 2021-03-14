import { Column } from '../../src';
import { createDiv } from '../utils/dom';

const data = [
  { time: '09', key: '有小车有任务', type: null, value: 1 },
  { time: '09', key: '无小车无任务', type: null, value: 1 },
  { time: '09', key: '无小车有任务', type: null, value: 1 },
  { time: '10', key: '有小车有任务', type: null, value: 1 },
  { time: '10', key: '无小车无任务', type: null, value: 1 },
  { time: '10', key: '无小车有任务', type: null, value: 1 },
  { time: '11', key: '有小车有任务', type: null, value: 1 },
  { time: '11', key: '无小车无任务', type: null, value: 1 },
  { time: '11', key: '无小车有任务', type: null, value: 1 },
  { time: '12', key: '有小车有任务', type: null, value: 1 },
  { time: '12', key: '无小车无任务', type: null, value: 1 },
  { time: '12', key: '无小车有任务', type: null, value: 1 },
  { time: '13', key: '有小车有任务', type: null, value: 1 },
  { time: '13', key: '无小车无任务', type: null, value: 1 },
  { time: '13', key: '无小车有任务', type: null, value: 1 },
  { time: '00', key: '有小车有任务', type: null, value: 1 },
  { time: '00', key: '无小车无任务', type: null, value: 1 },
  { time: '00', key: '无小车有任务', type: null, value: 1 },
];

describe('#2116', () => {
  test('percent column x Axis order', async () => {
    const plot = new Column(createDiv(), {
      data,
      xField: 'time',
      yField: 'value',
      seriesField: 'key',
      isPercent: true,
      isStack: true,
      appendPadding: 8,
      legend: {
        position: 'top',
      },
    });

    plot.render();

    // 保持数据顺序
    expect(plot.chart.getData().map((d) => d.time)).toEqual(data.map((d) => d.time));

    expect(
      plot.chart
        .getXScale()
        .getTicks()
        .map((t) => t.text)
    ).toEqual(['09', '10', '11', '12', '13', '00']);

    plot.destroy();
  });
});
