import { Progress } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('progress', () => {
  it('data', () => {
    const progress = new Progress(createDiv(), {
      width: 200,
      height: 100,
      percent: 0.6,
      autoFit: false,
    });

    progress.render();
    expect(progress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(progress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    expect(progress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#FAAD14');
    expect(progress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(progress.chart.geometries[0].elements[1].getData().percent).toBe(0.4);
    expect(progress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');

    progress.update({
      width: 200,
      height: 100,
      percent: 0.5,
      autoFit: false,
    });
    expect(progress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(progress.chart.geometries[0].elements[0].getData().percent).toBe(0.5);
    expect(progress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#FAAD14');
    expect(progress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(progress.chart.geometries[0].elements[1].getData().percent).toBe(0.5);
    expect(progress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');
  });

  it('data with color', () => {
    const progress = new Progress(createDiv(), {
      width: 200,
      height: 100,
      percent: 0.6,
      color: ['#123456', '#654321'],
      autoFit: false,
    });

    progress.render();
    expect(progress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(progress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    expect(progress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#123456');
    expect(progress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(progress.chart.geometries[0].elements[1].getData().percent).toBe(0.4);
    expect(progress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#654321');

    progress.update({
      width: 200,
      height: 100,
      percent: 0.6,
      color: () => ['#654321', '#123456'],
      autoFit: false,
    });
    expect(progress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(progress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    expect(progress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#654321');
    expect(progress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(progress.chart.geometries[0].elements[1].getData().percent).toBe(0.4);
    expect(progress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#123456');
  });

  it('data with progressStyle', () => {
    const progress = new Progress(createDiv(), {
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

    progress.render();
    expect(progress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(progress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    expect(progress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#FAAD14');
    expect(progress.chart.geometries[0].elements[0].shape.attr('stroke')).toBe('#123456');
    expect(progress.chart.geometries[0].elements[0].shape.attr('lineWidth')).toBe(2);
    expect(progress.chart.geometries[0].elements[0].shape.attr('lineDash')).toEqual([2, 2]);
    expect(progress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(progress.chart.geometries[0].elements[1].getData().percent).toBe(0.4);
    expect(progress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');
    expect(progress.chart.geometries[0].elements[1].shape.attr('stroke')).toBe('#123456');
    expect(progress.chart.geometries[0].elements[1].shape.attr('lineWidth')).toBe(2);
    expect(progress.chart.geometries[0].elements[1].shape.attr('lineDash')).toEqual([2, 2]);

    progress.update({
      width: 200,
      height: 100,
      percent: 0.6,
      progressStyle: {
        stroke: '#654321',
        lineWidth: 4,
        lineDash: [4, 4],
      },
      autoFit: false,
    });
    expect(progress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(progress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    expect(progress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#FAAD14');
    expect(progress.chart.geometries[0].elements[0].shape.attr('stroke')).toBe('#654321');
    expect(progress.chart.geometries[0].elements[0].shape.attr('lineWidth')).toBe(4);
    expect(progress.chart.geometries[0].elements[0].shape.attr('lineDash')).toEqual([4, 4]);
    expect(progress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(progress.chart.geometries[0].elements[1].getData().percent).toBe(0.4);
    expect(progress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');
    expect(progress.chart.geometries[0].elements[1].shape.attr('stroke')).toBe('#654321');
    expect(progress.chart.geometries[0].elements[1].shape.attr('lineWidth')).toBe(4);
    expect(progress.chart.geometries[0].elements[1].shape.attr('lineDash')).toEqual([4, 4]);
  });
});
