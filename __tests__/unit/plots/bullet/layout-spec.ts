import { Bullet } from '../../../../src';
import { bulletDatas } from '../../../data/bullet';
import { createDiv } from '../../../utils/dom';

describe('bullet*label', () => {
  it('layout*default*horizontal', () => {
    const bullet = new Bullet(createDiv('layout*default*horizontal bullet'), {
      width: 400,
      height: 400,
      data: bulletDatas,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
    });

    bullet.render();

    const chart = bullet.chart;
    const [rangeGeometry, measureGeometry, targetGeometry] = chart.geometries;
    expect(rangeGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'ranges',
    });
    expect(measureGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'measures',
    });
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

  it('layout vertical', () => {
    const bullet = new Bullet(createDiv('layout*vertical bullet'), {
      width: 400,
      height: 400,
      data: bulletDatas,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      layout: 'vertical',
    });

    bullet.render();

    const chart = bullet.chart;
    const [rangeGeometry, measureGeometry, targetGeometry] = chart.geometries;
    expect(rangeGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'ranges',
    });
    expect(measureGeometry.getAdjust('stack')).toMatchObject({
      xField: 'title',
      yField: 'measures',
    });
    // @ts-ignore 垂直的时候不会转换坐标轴
    expect(chart.getCoordinate().isTransposed).toBe(false);
    const shapeArr = [];
    const elements = targetGeometry.elements;
    elements.forEach((ele) => {
      shapeArr.push(ele.getModel().shape);
    });
    expect(shapeArr).toContain('hyphen');

    bullet.destroy();
  });
});
