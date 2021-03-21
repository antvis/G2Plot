import { RadialBar } from '../../src';
import { createDiv } from '../utils/dom';

describe('#2394', () => {
  it('filter illegal data', () => {
    const data = [
      { name: 'X6', star: '297a' },
      { name: 'G', star: 506 },
      { name: 'AVA', star: 805 },
      { name: 'G2Plot', star: 1478 },
      { name: 'L7', star: 2029 },
      { name: 'G6', star: 7100 },
      { name: 'F2', star: 7346 },
      { name: 'G2', star: 10178 },
    ];

    const radialBar = new RadialBar(createDiv(), {
      data,
      xField: 'name',
      yField: 'star',
      // maxAngle: 90, //最大旋转角度,
      radius: 0.8,
      innerRadius: 0.2,
      tooltip: {
        formatter: (datum) => {
          return { name: 'star数', value: datum.star };
        },
      },
    });

    radialBar.render();

    expect(radialBar.chart.geometries[0].elements.length).toBe(7);
    expect(radialBar.chart.geometries[0].data.length).toBe(7);

    radialBar.destroy();
  });
});
