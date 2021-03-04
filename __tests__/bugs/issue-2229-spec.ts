import { Bullet } from '../../src/plots/bullet';
import { createDiv } from '../utils/dom';

const data = [
  {
    title: '重庆',
    ranges: [30, 90, 120],
    measures: [65],
    target: 80,
  },
  {
    title: '杭州',
    ranges: [30, 90, 120],
    measures: [50],
    target: 100,
  },
  {
    title: '广州',
    ranges: [30, 90, 120],
    measures: [40],
    target: 85,
  },
  {
    title: '深圳',
    ranges: [30, 90, 120],
    measures: [50],
    target: 100,
  },
];
describe('bullet-issue-2229', () => {
  it('measureSize*rangeSize*targetSize', () => {
    const bullet = new Bullet(createDiv('measureSize*rangeSize bullet'), {
      width: 400,
      height: 400,
      data,
      measureField: 'measures',
      rangeField: 'ranges',
      targetField: 'target',
      xField: 'title',
      size: {
        range: (arg) => {
          return 20;
        },
        measure: (arg) => {
          return 15;
        },
        target: (arg) => {
          return 20;
        },
      },
    });

    bullet.render();
    const chart = bullet.chart;
    const rangeGeometry = chart.geometries[0];
    expect(rangeGeometry.elements[0].getModel().size).toEqual(20);

    const measureGeometry = chart.geometries[1];
    expect(measureGeometry.elements[0].getModel().size).toEqual(15);

    const targetGeometry = chart.geometries[2];
    expect(targetGeometry.elements[0].getModel().size).toEqual(20 / 2);

    bullet.destroy();
  });
});
