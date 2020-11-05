import { Bullet } from '../../../../src';
import { bulletData } from '../../../data/bullet';
import { createDiv } from '../../../utils/dom';

describe('bulletStyle*label', () => {
  it('bulletStyle', () => {
    const bullet = new Bullet(createDiv('bulletStyle bullet'), {
      width: 400,
      height: 100,
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      bulletStyle: {
        range: {
          fillOpacity: 0.65,
        },
        target: {
          stroke: '#ddd',
        },
      },
    });

    bullet.render();

    const chart = bullet.chart;
    const [rangeGeometry, measureGeometry, targetGeometry] = chart.geometries;

    const rangeElements = rangeGeometry.elements[0];
    expect(rangeElements.shape.attr('fillOpacity')).toBe(0.65);

    expect(measureGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'measures',
    });

    const targetElements = targetGeometry.elements[0];
    expect(targetElements.shape.attr('stroke')).toBe('#ddd');

    bullet.destroy();
  });
});
