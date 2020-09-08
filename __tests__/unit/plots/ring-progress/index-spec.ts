import { RingProgress } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('ring-progress', () => {
  it('data', () => {
    const ringProgress = new RingProgress(createDiv(), {
      radius: 1,
      innerRadius: 0.5,
      width: 200,
      height: 100,
      percent: 0.6,
      autoFit: false,
    });

    ringProgress.render();
    expect(ringProgress.chart.geometries[0].coordinate.type).toBe('theta');
    expect(ringProgress.chart.geometries[0].coordinate.radius).toBe(1);
    expect(ringProgress.chart.geometries[0].coordinate.innerRadius).toBe(0.5);

    expect(ringProgress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(ringProgress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    expect(ringProgress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#FAAD14');
    expect(ringProgress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(ringProgress.chart.geometries[0].elements[1].getData().percent).toBe(0.4);
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');

    ringProgress.update({
      ...ringProgress.options,
      radius: 0.98,
      innerRadius: 0.8,
      percent: 0.5,
    });
    expect(ringProgress.chart.geometries[0].coordinate.type).toBe('theta');
    expect(ringProgress.chart.geometries[0].coordinate.radius).toBe(0.98);
    expect(ringProgress.chart.geometries[0].coordinate.innerRadius).toBe(0.8);
    expect(ringProgress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(ringProgress.chart.geometries[0].elements[0].getData().percent).toBe(0.5);
    expect(ringProgress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#FAAD14');
    expect(ringProgress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(ringProgress.chart.geometries[0].elements[1].getData().percent).toBe(0.5);
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');
  });

  it('data with color', () => {
    const ringProgress = new RingProgress(createDiv(), {
      radius: 1,
      innerRadius: 0.5,
      width: 200,
      height: 100,
      percent: 0.6,
      color: ['#123456', '#654321'],
      autoFit: false,
    });

    ringProgress.render();
    expect(ringProgress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(ringProgress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    expect(ringProgress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#123456');
    expect(ringProgress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(ringProgress.chart.geometries[0].elements[1].getData().percent).toBe(0.4);
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#654321');

    ringProgress.update({
      ...ringProgress.options,
      color: ['#654321', '#123456'],
    });
    expect(ringProgress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(ringProgress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    expect(ringProgress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#654321');
    expect(ringProgress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(ringProgress.chart.geometries[0].elements[1].getData().percent).toBe(0.4);
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#123456');
  });

  it('data with progressStyle', () => {
    const ringProgress = new RingProgress(createDiv(), {
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

    ringProgress.render();
    expect(ringProgress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(ringProgress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    expect(ringProgress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#FAAD14');
    expect(ringProgress.chart.geometries[0].elements[0].shape.attr('stroke')).toBe('#123456');
    expect(ringProgress.chart.geometries[0].elements[0].shape.attr('lineWidth')).toBe(2);
    expect(ringProgress.chart.geometries[0].elements[0].shape.attr('lineDash')).toEqual([2, 2]);
    expect(ringProgress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(ringProgress.chart.geometries[0].elements[1].getData().percent).toBe(0.4);
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('stroke')).toBe('#123456');
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('lineWidth')).toBe(2);
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('lineDash')).toEqual([2, 2]);

    const progressStyle = (percent, type) => {
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

    ringProgress.update({
      ...ringProgress.options,
      progressStyle,
    });
    expect(ringProgress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(ringProgress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    expect(ringProgress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#FAAD14');
    expect(ringProgress.chart.geometries[0].elements[0].shape.attr('stroke')).toBe('#654321');
    expect(ringProgress.chart.geometries[0].elements[0].shape.attr('lineWidth')).toBe(4);
    expect(ringProgress.chart.geometries[0].elements[0].shape.attr('lineDash')).toEqual([4, 4]);
    expect(ringProgress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(ringProgress.chart.geometries[0].elements[1].getData().percent).toBe(0.4);
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('stroke')).toBe('#123456');
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('lineWidth')).toBe(4);
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('lineDash')).toEqual([4, 4]);

    ringProgress.update({
      ...ringProgress.options,
      percent: 0.4,
    });

    expect(ringProgress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(ringProgress.chart.geometries[0].elements[0].getData().percent).toBe(0.4);
    expect(ringProgress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#FAAD14');
    expect(ringProgress.chart.geometries[0].elements[0].shape.attr('stroke')).toBe('#123456');
    expect(ringProgress.chart.geometries[0].elements[0].shape.attr('lineWidth')).toBe(4);
    expect(ringProgress.chart.geometries[0].elements[0].shape.attr('lineDash')).toEqual([4, 4]);
    expect(ringProgress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(ringProgress.chart.geometries[0].elements[1].getData().percent).toBe(0.6);
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('stroke')).toBe('#654321');
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('lineWidth')).toBe(4);
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('lineDash')).toEqual([4, 4]);
  });

  it('data without radius', () => {
    const ringProgress = new RingProgress(createDiv(), {
      width: 200,
      height: 100,
      percent: 0.6,
      autoFit: false,
    });

    ringProgress.render();
    expect(ringProgress.chart.geometries[0].coordinate.type).toBe('theta');
    expect(ringProgress.chart.geometries[0].coordinate.radius).toBe(0.98);
    expect(ringProgress.chart.geometries[0].coordinate.innerRadius).toBe(0.8);
    expect(ringProgress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(ringProgress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    expect(ringProgress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#FAAD14');
    expect(ringProgress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(ringProgress.chart.geometries[0].elements[1].getData().percent).toBe(0.4);
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');
  });

  it('annotation', () => {
    const ringProgress = new RingProgress(createDiv(), {
      height: 100,
      width: 100,
      autoFit: false,
      percent: 0.7,
      annotations: [
        {
          type: 'text',
          position: ['50%', '50%'],
          content: '辅助文本',
        },
      ],
    });

    ringProgress.render();
    expect(ringProgress.chart.getController('annotation').getComponents().length).toBe(1);
  });
});
