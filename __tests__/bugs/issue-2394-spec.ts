import { RadialBar } from '../../src';
import { createDiv } from '../utils/dom';

describe('#2394', () => {
  it('filter illegal data', () => {
    const data = [
      { name: 'X6', star: '297a' },
      { name: 'G', star: NaN },
      { name: 'G2Plot', star: undefined },
      { name: 'L7', star: '0' },
      { name: 'AVA', star: null },
      { name: 'G6', star: 0 },
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

    expect(radialBar.chart.geometries[0].elements.length).toBe(4);
    expect(radialBar.chart.geometries[0].data.length).toBe(4);

    // null认为是0，不过滤
    expect(radialBar.chart.geometries[0].data[0].star).toBeNull();

    expect(radialBar.chart.geometries[0].data[1].star).toBe(0);

    radialBar.destroy();
  });
});
