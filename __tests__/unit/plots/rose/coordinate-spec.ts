import { Rose } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('rose', () => {
  it('set startAngle & endAngle', () => {
    const rose = new Rose(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
      seriesField: 'area',
      radius: 0.8,
      startAngle: 0,
      endAngle: Math.PI,
    });

    rose.render();

    const coordinate = rose.chart.getCoordinate();
    const { startAngle, endAngle } = coordinate;
    expect(startAngle).toBe(0);
    expect(endAngle).toBe(Math.PI);

    rose.destroy();
  });
});
