import { RingProgress } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/ring-progress/constants';
import { delay } from '../../../utils/delay';
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
    expect(ringProgress.chart.geometries[0].elements[1].getData().percent).toBe(1);
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
    expect(ringProgress.chart.geometries[0].elements[1].getData().percent).toBe(1);
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');

    ringProgress.destroy();
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
    expect(ringProgress.chart.geometries[0].elements[1].getData().percent).toBe(1);
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#654321');

    ringProgress.update({
      ...ringProgress.options,
      color: ['#654321', '#123456'],
    });
    expect(ringProgress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(ringProgress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    expect(ringProgress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#654321');
    expect(ringProgress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(ringProgress.chart.geometries[0].elements[1].getData().percent).toBe(1);
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#123456');

    ringProgress.destroy();
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
    expect(ringProgress.chart.geometries[0].elements[1].getData().percent).toBe(1);
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('stroke')).toBe('#123456');
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('lineWidth')).toBe(2);
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('lineDash')).toEqual([2, 2]);

    const progressStyle = ({ current, percent, type }) => {
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
        return percent - current >= 0.5
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
    expect(ringProgress.chart.geometries[0].elements[1].getData().percent).toBe(1);
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
    expect(ringProgress.chart.geometries[0].elements[1].getData().percent).toBe(1);
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('stroke')).toBe('#654321');
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('lineWidth')).toBe(4);
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('lineDash')).toEqual([4, 4]);

    ringProgress.destroy();
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
    expect(ringProgress.chart.geometries[0].elements[1].getData().percent).toBe(1);
    expect(ringProgress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');

    ringProgress.destroy();
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
          style: {
            textBaseline: 'middle',
            textAlign: 'center',
          },
        },
      ],
    });

    ringProgress.render();
    expect(ringProgress.chart.getController('annotation').getComponents().length).toBe(2);

    ringProgress.destroy();
  });

  it('color string', () => {
    const ring = new RingProgress(createDiv(), {
      width: 200,
      height: 100,
      percent: 0.6,
      autoFit: false,
      color: 'green',
    });

    ring.render();

    expect(ring.chart.geometries[0].getAttribute('color').values).toEqual(['green', '#E8EDF3']);

    ring.destroy();
  });

  it('> 1, < 0', () => {
    const ring = new RingProgress(createDiv(), {
      width: 600,
      height: 300,
      autoFit: false,
      percent: 1.65,
    });

    ring.render();

    expect(ring.chart.getData()).toMatchObject([
      {
        type: 'current',
        percent: 1,
      },
      {
        type: 'target',
        percent: 1,
      },
    ]);

    ring.update({
      ...ring.options,
      percent: -1.65,
    });

    expect(ring.chart.getData()).toMatchObject([
      {
        type: 'current',
        percent: 0,
      },
      {
        type: 'target',
        percent: 1,
      },
    ]);

    ring.destroy();
  });

  it('style callback', async () => {
    const div = createDiv();
    const ring = new RingProgress(div, {
      width: 200,
      height: 100,
      percent: 0.6,
      autoFit: false,
      color: 'green',
      statistic: {
        content: {
          style: ({ percent }) => {
            return {
              fontSize: `${20 * percent}px`,
              textAlign: 'center',
              textBaseline: 'middle',
            };
          },
        },
      },
    });

    ring.render();

    await delay(10);
    const annotation = div.querySelector('.g2-html-annotation');
    expect((annotation as HTMLElement).style['font-size']).toBe(`${20 * 0.6}px`);

    ring.destroy();
  });

  it('change data', () => {
    const ringProgress = new RingProgress(createDiv(), {
      radius: 1,
      innerRadius: 0.5,
      width: 200,
      height: 100,
      percent: 0.6,
      autoFit: false,
    });

    ringProgress.render();
    expect(ringProgress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    ringProgress.changeData(0.7);
    expect(ringProgress.chart.geometries[0].elements[0].getData().percent).toBe(0.7);

    ringProgress.destroy();
  });

  it('defaultOptions 保持从 constants 中获取', () => {
    expect(RingProgress.getDefaultOptions()).toEqual(DEFAULT_OPTIONS);
  });

  it('z-index', () => {
    const ringProgress = new RingProgress(createDiv(), {
      radius: 1,
      innerRadius: 0.5,
      width: 200,
      height: 100,
      percent: 0.6,
      autoFit: false,
    });

    ringProgress.render();
    let elements = ringProgress.chart.geometries[0].elements;
    expect(elements[0].shape.get('zIndex')).toBeGreaterThan(elements[1].shape.get('zIndex'));
    ringProgress.changeData(0.7);
    elements = ringProgress.chart.geometries[0].elements;
    expect(elements[0].shape.get('zIndex')).toBeGreaterThan(elements[1].shape.get('zIndex'));

    ringProgress.destroy();
  });
});
