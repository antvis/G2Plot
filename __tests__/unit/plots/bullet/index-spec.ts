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

    expect(bullet.type).toBe('bullet');

    const chart = bullet.chart;

    expect(chart.getController('legend').getComponents().length).toEqual(0);
    // 默认关闭 showMarkers
    // @ts-ignore
    expect(chart.getController('tooltip').getTooltipCfg().showMarkers).toEqual(false);
    // @ts-ignore
    expect(chart.options.axes.ranges).toEqual(false);
    // @ts-ignore
    expect(chart.options.axes.target).toEqual(false);
    const [rangeGeometry, measureGeometry, targetGeometry] = chart.geometries;

    const rangeElements = rangeGeometry.elements[0];
    expect(rangeElements.shape.attr('fillOpacity')).toBe(0.5);
    expect(rangeGeometry.getAttribute('size').values[0]).toEqual(30);
    expect(rangeGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'ranges',
    });
    expect(rangeGeometry.tooltipOption).toEqual(false);
    expect(rangeGeometry.getYScale().max).toEqual(100);
    expect(rangeGeometry.getYScale().min).toEqual(0);
    expect(rangeGeometry.getAttribute('color').getFields()[0]).toEqual('rKey');
    const rColor = rangeGeometry.theme.colors10;
    expect(rangeGeometry.getAttribute('color').values).toEqual(rColor);

    expect(measureGeometry.getAttribute('size').values[0]).toEqual(20);
    expect(measureGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'measures',
    });
    expect(measureGeometry.getYScale().max).toEqual(100);
    expect(measureGeometry.getYScale().min).toEqual(0);

    expect(measureGeometry.getAttribute('color').getFields()[0]).toEqual('mKey');
    const mColor = measureGeometry.theme.colors10;
    expect(measureGeometry.getAttribute('color').values).toEqual(mColor);
    //@ts-ignore
    expect(measureGeometry.labelOption.cfg.position).toEqual('right');

    //@ts-ignore
    expect(measureGeometry.labelOption.fields[0]).toEqual('measures');

    expect(targetGeometry.getAttribute('size').values[0]).toEqual(20 / 2);
    expect(targetGeometry.getYScale().max).toEqual(100);
    expect(targetGeometry.getYScale().min).toEqual(0);
    expect(targetGeometry.getAttribute('color').getFields()[0]).toEqual('tKey');
    const tColor = targetGeometry.theme.colors10;
    expect(targetGeometry.getAttribute('color').values).toEqual(tColor);

    // @ts-ignore 默认水平的时候会转换坐标轴
    expect(chart.getCoordinate().isTransposed).toBe(true);
    const shapeArr = [];
    const elements = targetGeometry.elements;
    elements.forEach((ele) => {
      shapeArr.push(ele.getModel().shape);
    });
    expect(shapeArr).toContain('line');

    bullet.destroy();
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
      yField: 'ranges',
    });

    expect(measureGeometry.getAdjust('stack')).toMatchObject({
      yField: 'measures',
    });
    expect(measureGeometry.getYScale().max).toEqual(100);
    expect(measureGeometry.getYScale().min).toEqual(0);

    bullet.destroy();
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
      color: {
        measure: '#ff0000',
      },
    });

    bullet.render();

    const chart = bullet.chart;
    const measureGeometry = chart.geometries[1];
    expect(measureGeometry.getAttribute('size').values[0]).toEqual(20);
    expect(measureGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'measures',
    });
    expect(measureGeometry.getAttribute('color').values).toEqual('#ff0000');

    bullet.destroy();
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
      color: {
        target: 'red',
      },
    });

    bullet.render();
    const chart = bullet.chart;
    const targetGeometry = chart.geometries[2];
    expect(targetGeometry.getAttribute('size').values[0]).toEqual(20 / 2);
    expect(targetGeometry.getAttribute('color').values).toEqual('red');

    bullet.destroy();
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
      color: {
        range: rangeColors,
      },
    });

    bullet.render();

    const chart = bullet.chart;

    const rangeGeometry = chart.geometries[0];

    expect(rangeGeometry.getAttribute('size').values[0]).toEqual(30);
    expect(rangeGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'ranges',
    });
    expect(rangeGeometry.getAttribute('color').values).toEqual(rangeColors);

    bullet.destroy();
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
      color: {
        measure: measureColors,
      },
    });

    bullet.render();

    const chart = bullet.chart;
    const measureGeometry = chart.geometries[1];
    expect(measureGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'measures',
    });
    expect(measureGeometry.getAttribute('color').values).toEqual(measureColors);

    bullet.destroy();
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
      size: {
        measure: measureSize,
        range: rangeSize,
      },
    });

    bullet.render();
    const chart = bullet.chart;
    const rangeGeometry = chart.geometries[0];
    expect(rangeGeometry.getAttribute('size').values[0]).toEqual(rangeSize);
    expect(rangeGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'ranges',
    });

    const measureGeometry = chart.geometries[1];
    expect(measureGeometry.getAttribute('size').values[0]).toEqual(measureSize);
    expect(measureGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'measures',
    });

    bullet.destroy();
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
      size: {
        measure: measureSize,
        range: rangeSize,
        target: targetSize,
      },
    });

    bullet.render();
    const chart = bullet.chart;
    const rangeGeometry = chart.geometries[0];
    expect(rangeGeometry.getAttribute('size').values[0]).toEqual(rangeSize);
    expect(rangeGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'ranges',
    });

    const measureGeometry = chart.geometries[1];
    expect(measureGeometry.getAttribute('size').values[0]).toEqual(measureSize);
    expect(measureGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'measures',
    });

    const targetGeometry = chart.geometries[2];
    expect(targetGeometry.getAttribute('size').values[0]).toEqual(25 / 2);

    bullet.destroy();
  });

  it('meta', () => {
    const bullet = new Bullet(createDiv(), {
      width: 400,
      height: 100,
      data: [{ title: '数学', ranges: [30, 50, 100], measures: [120], target: 85 }],
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      meta: {
        measures: { max: 100 },
      },
    });

    bullet.render();
    expect(bullet.chart.getScaleByField('measures').max).toBe(100);

    bullet.update({
      meta: {
        measures: { max: 90, maxLimit: 120 },
      },
    });
    expect(bullet.chart.getScaleByField('measures').max).toBe(120);
    expect(bullet.chart.getScaleByField('measures').maxLimit).toBe(120);
  });
});
