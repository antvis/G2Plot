import { Radar } from '../../../../src';
import { SINGLE_DATA } from '../../../data/radar';
import { createDiv } from '../../../utils/dom';

describe('radar', () => {
  it('set innerRadius & startAngle & endAngle', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SINGLE_DATA,
      xField: 'name',
      yField: 'value',
      radius: 0.8,
      startAngle: 0,
      endAngle: Math.PI,
    });

    radar.render();

    const coordinate = radar.chart.getCoordinate();
    const { radius, startAngle, endAngle } = coordinate;
    expect(startAngle).toBe(0);
    expect(endAngle).toBe(Math.PI);

    radar.destroy();
  });
});
