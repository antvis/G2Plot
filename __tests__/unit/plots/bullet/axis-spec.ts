import { Bullet } from '../../../../src';
import { bulletData } from '../../../data/bullet';
import { createDiv } from '../../../utils/dom';

describe('axis bullet', () => {
  it('axis*meta', () => {
    const rangeColors = ['#FFB1AC', '#FFDBA2', '#B4EBBF'];
    const bullet = new Bullet(createDiv('axis*meta bullet'), {
      width: 400,
      height: 100,
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      meta: {
        measure: {
          min: 0,
          max: 120,
        },
      },
      bulletStyle: {
        range: {
          color: rangeColors,
        },
      },
    });

    bullet.render();

    const rangeGeometry = bullet.chart.geometries[0];
    expect(rangeGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'range',
    });
    expect(rangeGeometry.getAttribute('color').values).toEqual(rangeColors);

    const measureGeometry = bullet.chart.geometries[1];
    expect(measureGeometry.scales.measure.min).toBe(0);
    expect(measureGeometry.scales.measure.max).toBe(120);
  });
});
