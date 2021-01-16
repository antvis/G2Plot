import { Bullet } from '../../../../src';
import { bulletData } from '../../../data/bullet';
import { createDiv } from '../../../utils/dom';

describe('axis bullet', () => {
  it('axis without meta', () => {
    const rangeColors = ['#FFB1AC', '#FFDBA2', '#B4EBBF'];
    const bullet = new Bullet(createDiv('axis*meta bullet'), {
      width: 400,
      height: 100,
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      yAxis: { tickCount: 10 },
    });

    bullet.render();
    const measureGeometry = bullet.chart.geometries[1];
    expect(measureGeometry.scales.measures.tickCount).toBe(10);

    bullet.destroy();
  });
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
        measures: {
          min: 0,
          max: 120,
        },
      },
      color: {
        range: rangeColors,
      },
    });

    bullet.render();

    const rangeGeometry = bullet.chart.geometries[0];
    expect(rangeGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'ranges',
    });
    expect(rangeGeometry.getAttribute('color').values).toEqual(rangeColors);

    const measureGeometry = bullet.chart.geometries[1];
    expect(measureGeometry.scales.measures.min).toBe(0);
    expect(measureGeometry.scales.measures.max).toBe(120);

    bullet.destroy();
  });

  it('axis*xAxis*false', () => {
    const bullet = new Bullet(createDiv('axis*xAxis*false bullet'), {
      width: 400,
      height: 100,
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      xAxis: false,
    });

    bullet.render();
    // @ts-ignore
    expect(bullet.chart.options.axes.title).toEqual(false);
    // @ts-ignore
    expect(bullet.chart.options.axes.ranges).toEqual(false);
    // @ts-ignore
    expect(bullet.chart.options.axes.target).toEqual(false);
    // expect(bullet.chart.options.axes.title).toBe('red');

    bullet.destroy();
  });

  it('axis*yAxis*false', () => {
    const bullet = new Bullet(createDiv('axis*yAxis*false bullet'), {
      width: 400,
      height: 100,
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      yAxis: false,
    });

    bullet.render();
    // @ts-ignore
    expect(bullet.chart.options.axes.ranges).toEqual(false);
    // @ts-ignore
    expect(bullet.chart.options.axes.target).toEqual(false);
    // @ts-ignore
    expect(bullet.chart.options.axes.measures).toEqual(false);

    bullet.destroy();
  });
});
