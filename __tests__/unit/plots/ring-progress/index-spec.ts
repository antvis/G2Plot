import { RingProgress } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('ring-progress', () => {
  it('data', () => {
    const ringGrogress = new RingProgress(createDiv(), {
      radius: 1,
      innerRadius: 0.5,
      width: 200,
      height: 100,
      percent: 0.6,
      autoFit: false,
    });

    ringGrogress.render();
    expect(ringGrogress.chart.geometries[0].coordinate.type).toBe('theta');
    expect(ringGrogress.chart.geometries[0].coordinate.radius).toBe(1);
    expect(ringGrogress.chart.geometries[0].coordinate.innerRadius).toBe(0.5);
    expect(ringGrogress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(ringGrogress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    expect(ringGrogress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#FAAD14');
    expect(ringGrogress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(ringGrogress.chart.geometries[0].elements[1].getData().percent).toBe(0.4);
    expect(ringGrogress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');

    ringGrogress.update({
      radius: 1,
      innerRadius: 0.5,
      width: 200,
      height: 100,
      percent: 0.5,
      autoFit: false,
    });
    expect(ringGrogress.chart.geometries[0].coordinate.type).toBe('theta');
    expect(ringGrogress.chart.geometries[0].coordinate.radius).toBe(1);
    expect(ringGrogress.chart.geometries[0].coordinate.innerRadius).toBe(0.5);
    expect(ringGrogress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(ringGrogress.chart.geometries[0].elements[0].getData().percent).toBe(0.5);
    expect(ringGrogress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#FAAD14');
    expect(ringGrogress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(ringGrogress.chart.geometries[0].elements[1].getData().percent).toBe(0.5);
    expect(ringGrogress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');
  });

  it('data with color', () => {
    const ringGrogress = new RingProgress(createDiv(), {
      radius: 1,
      innerRadius: 0.5,
      width: 200,
      height: 100,
      percent: 0.6,
      color: ['#123456', '#654321'],
      autoFit: false,
    });

    ringGrogress.render();
    expect(ringGrogress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(ringGrogress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    expect(ringGrogress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#123456');
    expect(ringGrogress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(ringGrogress.chart.geometries[0].elements[1].getData().percent).toBe(0.4);
    expect(ringGrogress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#654321');

    ringGrogress.update({
      radius: 1,
      innerRadius: 0.5,
      width: 200,
      height: 100,
      percent: 0.6,
      color: () => ['#654321', '#123456'],
      autoFit: false,
    });
    expect(ringGrogress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(ringGrogress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    expect(ringGrogress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#654321');
    expect(ringGrogress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(ringGrogress.chart.geometries[0].elements[1].getData().percent).toBe(0.4);
    expect(ringGrogress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#123456');
  });

  it('data with progressStyle', () => {
    const ringGrogress = new RingProgress(createDiv(), {
      radius: 1,
      innerRadius: 0.5,
      width: 200,
      height: 100,
      percent: 0.6,
      progressStyle: {
        stroke: '#123456',
        lineWidth: 2,
        lineDash: [2, 2],
      },
      autoFit: false,
    });

    ringGrogress.render();
    expect(ringGrogress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(ringGrogress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    expect(ringGrogress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#FAAD14');
    expect(ringGrogress.chart.geometries[0].elements[0].shape.attr('stroke')).toBe('#123456');
    expect(ringGrogress.chart.geometries[0].elements[0].shape.attr('lineWidth')).toBe(2);
    expect(ringGrogress.chart.geometries[0].elements[0].shape.attr('lineDash')).toEqual([2, 2]);
    expect(ringGrogress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(ringGrogress.chart.geometries[0].elements[1].getData().percent).toBe(0.4);
    expect(ringGrogress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');
    expect(ringGrogress.chart.geometries[0].elements[1].shape.attr('stroke')).toBe('#123456');
    expect(ringGrogress.chart.geometries[0].elements[1].shape.attr('lineWidth')).toBe(2);
    expect(ringGrogress.chart.geometries[0].elements[1].shape.attr('lineDash')).toEqual([2, 2]);

    const progressStyle = (x, percent, type) => {
      if (type === 'current') {
        return percent > 0.5
          ? {
              stroke: '#654321',
              lineWidth: 4,
              lineDash: [4, 4],
            }
          : {
              stroke: '#123456',
              lineWidth: 4,
              lineDash: [4, 4],
            };
      } else if (type === 'target') {
        return percent >= 0.5
          ? {
              stroke: '#654321',
              lineWidth: 4,
              lineDash: [4, 4],
            }
          : {
              stroke: '#123456',
              lineWidth: 4,
              lineDash: [4, 4],
            };
      }
    };

    ringGrogress.update({
      radius: 1,
      innerRadius: 0.5,
      width: 200,
      height: 100,
      percent: 0.6,
      progressStyle,
      autoFit: false,
    });
    expect(ringGrogress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(ringGrogress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    expect(ringGrogress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#FAAD14');
    expect(ringGrogress.chart.geometries[0].elements[0].shape.attr('stroke')).toBe('#654321');
    expect(ringGrogress.chart.geometries[0].elements[0].shape.attr('lineWidth')).toBe(4);
    expect(ringGrogress.chart.geometries[0].elements[0].shape.attr('lineDash')).toEqual([4, 4]);
    expect(ringGrogress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(ringGrogress.chart.geometries[0].elements[1].getData().percent).toBe(0.4);
    expect(ringGrogress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');
    expect(ringGrogress.chart.geometries[0].elements[1].shape.attr('stroke')).toBe('#123456');
    expect(ringGrogress.chart.geometries[0].elements[1].shape.attr('lineWidth')).toBe(4);
    expect(ringGrogress.chart.geometries[0].elements[1].shape.attr('lineDash')).toEqual([4, 4]);

    ringGrogress.update({
      radius: 1,
      innerRadius: 0.5,
      width: 200,
      height: 100,
      percent: 0.4,
      progressStyle,
      autoFit: false,
    });

    expect(ringGrogress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(ringGrogress.chart.geometries[0].elements[0].getData().percent).toBe(0.4);
    expect(ringGrogress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#FAAD14');
    expect(ringGrogress.chart.geometries[0].elements[0].shape.attr('stroke')).toBe('#123456');
    expect(ringGrogress.chart.geometries[0].elements[0].shape.attr('lineWidth')).toBe(4);
    expect(ringGrogress.chart.geometries[0].elements[0].shape.attr('lineDash')).toEqual([4, 4]);
    expect(ringGrogress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(ringGrogress.chart.geometries[0].elements[1].getData().percent).toBe(0.6);
    expect(ringGrogress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');
    expect(ringGrogress.chart.geometries[0].elements[1].shape.attr('stroke')).toBe('#654321');
    expect(ringGrogress.chart.geometries[0].elements[1].shape.attr('lineWidth')).toBe(4);
    expect(ringGrogress.chart.geometries[0].elements[1].shape.attr('lineDash')).toEqual([4, 4]);
  });

  it('data without radius', () => {
    const ringGrogress = new RingProgress(createDiv(), {
      width: 200,
      height: 100,
      percent: 0.6,
      autoFit: false,
    });

    ringGrogress.render();
    expect(ringGrogress.chart.geometries[0].coordinate.type).toBe('theta');
    expect(ringGrogress.chart.geometries[0].coordinate.radius).toBe(1);
    expect(ringGrogress.chart.geometries[0].coordinate.innerRadius).toBe(0.8);
    expect(ringGrogress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(ringGrogress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    expect(ringGrogress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#FAAD14');
    expect(ringGrogress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(ringGrogress.chart.geometries[0].elements[1].getData().percent).toBe(0.4);
    expect(ringGrogress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');
  });
});
