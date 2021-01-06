import { RadialBar } from '../../src';
import { createDiv } from '../utils/dom';

describe('#2161', () => {
  it('[玉珏图] 当某一数据项 value 为 undefined 时，页面崩溃', () => {
    const data = [
      { name: 'X6', star: 297 },
      { name: 'G' },
      { name: 'AVA', star: 805 },
      { name: 'G2Plot', star: 1478 },
      { name: 'L7', star: 2029 },
      { name: 'G6', star: 7100 },
      { name: 'F2', star: 7346 },
      { name: 'G2', star: 10178 },
    ];

    const bar = new RadialBar(createDiv(), {
      width: 400,
      height: 300,
      data,
      xField: 'name',
      yField: 'star',
      radius: 0.8,
      innerRadius: 0.2,
      tooltip: {
        formatter: (datum) => {
          return { name: 'star数', value: datum.star };
        },
      },
    });
    bar.render();

    expect(bar.chart).toBeDefined();

    bar.destroy();
  });
});
