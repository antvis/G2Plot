import { Bullet } from '../../../../src';
import { bulletData, bulletDatas } from '../../../data/bullet';
import { createDiv } from '../../../utils/dom';

describe('bullet', () => {
  it('default', () => {
    const bullet = new Bullet(createDiv('basic bullet'), {
      width: 400,
      height: 100,
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
    });

    bullet.render();

    const chart = bullet.chart;

    const rangeGeometry = chart.geometries[0];

    expect(rangeGeometry.getAttribute('size').values[0]).toEqual(30);
    expect(rangeGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'range',
    });
    expect(rangeGeometry.getYScale().max).toEqual(100);
    expect(rangeGeometry.getYScale().min).toEqual(0);

    const measureGeometry = chart.geometries[1];
    expect(measureGeometry.getAttribute('size').values[0]).toEqual(20);
    expect(measureGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'measure',
    });
    expect(measureGeometry.getYScale().max).toEqual(100);
    expect(measureGeometry.getYScale().min).toEqual(0);

    const targetGeometry = chart.geometries[2];
    expect(targetGeometry.getAttribute('size').values[0]).toEqual(20 / 2);
    expect(targetGeometry.getYScale().max).toEqual(100);
    expect(targetGeometry.getYScale().min).toEqual(0);
  });

  it('no title', () => {
    const bullet = new Bullet(createDiv('no title bullet'), {
      width: 400,
      height: 100,
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
    });

    bullet.render();

    const chart = bullet.chart;

    const [rangeGeometry, measureGeometry] = chart.geometries;

    expect(rangeGeometry.getAttribute('size').values[0]).toEqual(30);
    expect(rangeGeometry.getAdjust('stack')).toMatchObject({
      yField: 'range',
    });

    expect(measureGeometry.getAdjust('stack')).toMatchObject({
      yField: 'measure',
    });
    expect(measureGeometry.getYScale().max).toEqual(100);
    expect(measureGeometry.getYScale().min).toEqual(0);
  });

  it('measureColors', () => {
    const bullet = new Bullet(createDiv('measureColors bullet'), {
      width: 400,
      height: 100,
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      bulletStyle: {
        measure: {
          color: '#ff0000',
        },
      },
    });

    bullet.render();

    const chart = bullet.chart;
    const measureGeometry = chart.geometries[1];
    expect(measureGeometry.getAttribute('size').values[0]).toEqual(20);
    expect(measureGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'measure',
    });
    expect(measureGeometry.getAttribute('color').values).toEqual('#ff0000');
  });

  it('targetColor', () => {
    const bullet = new Bullet(createDiv('targetColor bullet'), {
      width: 400,
      height: 100,
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      bulletStyle: {
        target: {
          color: 'red',
        },
      },
    });

    bullet.render();
    const chart = bullet.chart;
    const targetGeometry = chart.geometries[2];
    expect(targetGeometry.getAttribute('size').values[0]).toEqual(20 / 2);
    expect(targetGeometry.getAttribute('color').values).toEqual('red');
  });

  it('rangesColor', () => {
    const rangeColors = ['#FFB1AC', '#FFDBA2', '#B4EBBF'];
    const bullet = new Bullet(createDiv('rangesColor bullet'), {
      width: 400,
      height: 100,
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      bulletStyle: {
        range: {
          color: rangeColors,
        },
      },
    });

    bullet.render();

    const chart = bullet.chart;

    const rangeGeometry = chart.geometries[0];

    expect(rangeGeometry.getAttribute('size').values[0]).toEqual(30);
    expect(rangeGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'range',
    });
    expect(rangeGeometry.getAttribute('color').values).toEqual(rangeColors);
  });

  it('stack*measure*measureColor', () => {
    const measureColors = ['red', 'green'];
    const bullet = new Bullet(createDiv('stack*measure bullet'), {
      width: 400,
      height: 100,
      data: bulletDatas,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      bulletStyle: {
        measure: {
          color: measureColors,
        },
      },
    });

    bullet.render();

    const chart = bullet.chart;
    const measureGeometry = chart.geometries[1];
    expect(measureGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'measure',
    });
    expect(measureGeometry.getAttribute('color').values).toEqual(measureColors);
  });

  it('measureSize*rangeSize', () => {
    const measureSize = 30;
    const rangeSize = 40;
    const bullet = new Bullet(createDiv('measureSize*rangeSize bullet'), {
      width: 400,
      height: 100,
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      bulletStyle: {
        measure: {
          size: measureSize,
        },
        range: {
          size: rangeSize,
        },
      },
    });

    bullet.render();
    const chart = bullet.chart;
    const rangeGeometry = chart.geometries[0];
    expect(rangeGeometry.getAttribute('size').values[0]).toEqual(rangeSize);
    expect(rangeGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'range',
    });

    const measureGeometry = chart.geometries[1];
    expect(measureGeometry.getAttribute('size').values[0]).toEqual(measureSize);
    expect(measureGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'measure',
    });
  });

  it('measureSize*rangeSize*targetSize', () => {
    const measureSize = 30;
    const rangeSize = 40;
    const targetSize = 25;
    const bullet = new Bullet(createDiv('measureSize*rangeSize bullet'), {
      width: 400,
      height: 100,
      data: bulletData,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      bulletStyle: {
        measure: {
          size: measureSize,
        },
        range: {
          size: rangeSize,
        },
        target: {
          size: targetSize,
        },
      },
    });

    bullet.render();
    const chart = bullet.chart;
    const rangeGeometry = chart.geometries[0];
    expect(rangeGeometry.getAttribute('size').values[0]).toEqual(rangeSize);
    expect(rangeGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'range',
    });

    const measureGeometry = chart.geometries[1];
    expect(measureGeometry.getAttribute('size').values[0]).toEqual(measureSize);
    expect(measureGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'measure',
    });

    const targetGeometry = chart.geometries[2];
    expect(targetGeometry.getAttribute('size').values[0]).toEqual(25 / 2);
  });
});
