import { Waterfall } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('waterfall plot', () => {
  const data = [
    { month: 'Jan', value: 2200000 },
    { month: 'Feb', value: -600000 },
    { month: 'Mar', value: -100000 },
    { month: 'Apr', value: 3700000 },
    { month: 'May', value: -2100000 },
    { month: 'Jun', value: 5300000 },
    { month: 'Jul', value: 3100000 },
    { month: 'Aug', value: -1500000 },
    { month: 'Sep', value: 4200000 },
    { month: 'Oct', value: 5300000 },
    { month: 'Nov', value: -1500000 },
    { month: 'Dec', value: 5100000 },
  ];

  const waterfall = new Waterfall(createDiv(), {
    width: 400,
    height: 300,
    xField: 'month',
    yField: 'value',
    data: data,
  });

  waterfall.render();

  afterAll(() => {
    waterfall.destroy();
  });

  it('data: 不存在小于 0', () => {
    const elements = waterfall.chart.geometries[0].elements;
    elements.forEach((ele) => {
      const leaderLineShape = ele.shape.get('children')[1];
      if (leaderLineShape) {
        expect(leaderLineShape.attr('path')[0][2]).toBe(leaderLineShape.attr('path')[1][2]);
      }
    });
  });

  it('data: 存在小于 0，总计大于 0', () => {
    waterfall.update({
      ...waterfall.options,
      data: [
        { month: 'Jan', value: 2200000 },
        { month: 'Feb', value: -3600000 },
        { month: 'Mar', value: -100000 },
        { month: 'Apr', value: 3700000 },
        { month: 'May', value: -2100000 },
        { month: 'Jun', value: 5300000 },
        { month: 'Jul', value: 3100000 },
        { month: 'Aug', value: -1500000 },
        { month: 'Sep', value: 4200000 },
        { month: 'Oct', value: 5300000 },
        { month: 'Nov', value: -1500000 },
        { month: 'Dec', value: 5100000 },
      ],
    });
    const elements = waterfall.chart.geometries[0].elements;
    elements.forEach((ele) => {
      const leaderLineShape = ele.shape.get('children')[1];
      if (leaderLineShape) {
        expect(leaderLineShape.attr('path')[0][2]).toBe(leaderLineShape.attr('path')[1][2]);
      }
    });
  });

  it('data: 存在小于 0，总计小于 0', () => {
    waterfall.update({
      ...waterfall.options,
      data: [
        { month: 'Jan', value: 2200000 },
        { month: 'Feb', value: -3600000 },
        { month: 'Mar', value: -9300000 },
        { month: 'Apr', value: 3700000 },
        { month: 'May', value: -2100000 },
        { month: 'Jun', value: 5300000 },
        { month: 'Jul', value: 3100000 },
        { month: 'Aug', value: -9500000 },
        { month: 'Sep', value: 4200000 },
        { month: 'Oct', value: 5300000 },
        { month: 'Nov', value: -5500000 },
        { month: 'Dec', value: 5100000 },
      ],
    });
    const elements = waterfall.chart.geometries[0].elements;
    elements.forEach((ele) => {
      const leaderLineShape = ele.shape.get('children')[1];
      if (leaderLineShape) {
        expect(leaderLineShape.attr('path')[0][2]).toBe(leaderLineShape.attr('path')[1][2]);
      }
    });
  });
});
