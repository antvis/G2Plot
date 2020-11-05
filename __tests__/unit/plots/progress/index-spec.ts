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
      ...progress.options,
      percent: 0.5,
    });
    expect(progress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(progress.chart.geometries[0].elements[0].getData().percent).toBe(0.5);
    expect(progress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#FAAD14');
    expect(progress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(progress.chart.geometries[0].elements[1].getData().percent).toBe(0.5);
    expect(progress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');

    progress.destroy();
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
      ...progress.options,
      color: ['#654321', '#123456'],
    });
    expect(progress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(progress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    expect(progress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#654321');
    expect(progress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(progress.chart.geometries[0].elements[1].getData().percent).toBe(0.4);
    expect(progress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#123456');

    progress.destroy();
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

    const progressStyle = ({ percent, type }) => {
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

    progress.update({
      ...progress.options,
      progressStyle,
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
    expect(progress.chart.geometries[0].elements[1].shape.attr('stroke')).toBe('#123456');
    expect(progress.chart.geometries[0].elements[1].shape.attr('lineWidth')).toBe(4);
    expect(progress.chart.geometries[0].elements[1].shape.attr('lineDash')).toEqual([4, 4]);

    progress.update({
      ...progress.options,
      percent: 0.4,
    });

    expect(progress.chart.geometries[0].elements[0].getData().type).toBe('current');
    expect(progress.chart.geometries[0].elements[0].getData().percent).toBe(0.4);
    expect(progress.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#FAAD14');
    expect(progress.chart.geometries[0].elements[0].shape.attr('stroke')).toBe('#123456');
    expect(progress.chart.geometries[0].elements[0].shape.attr('lineWidth')).toBe(4);
    expect(progress.chart.geometries[0].elements[0].shape.attr('lineDash')).toEqual([4, 4]);
    expect(progress.chart.geometries[0].elements[1].getData().type).toBe('target');
    expect(progress.chart.geometries[0].elements[1].getData().percent).toBe(0.6);
    expect(progress.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#E8EDF3');
    expect(progress.chart.geometries[0].elements[1].shape.attr('stroke')).toBe('#654321');
    expect(progress.chart.geometries[0].elements[1].shape.attr('lineWidth')).toBe(4);
    expect(progress.chart.geometries[0].elements[1].shape.attr('lineDash')).toEqual([4, 4]);

    progress.destroy();
  });

  it('barWidthRatio', () => {
    const progress = new Progress(createDiv(), {
      width: 200,
      height: 100,
      percent: 0.6,
      barWidthRatio: 0.1,
      autoFit: false,
    });

    progress.render();

    expect(progress.chart.getTheme().columnWidthRatio).toBe(0.1);

    progress.destroy();
  });

  it('annotation', () => {
    const progress = new Progress(createDiv(), {
      width: 200,
      height: 100,
      percent: 0.6,
      barWidthRatio: 0.1,
      autoFit: false,
      annotations: [
        {
          type: 'text',
          position: ['50%', '50%'],
          content: '辅助文本',
        },
      ],
    });

    progress.render();
    expect(progress.chart.getController('annotation').getComponents().length).toBe(1);

    progress.destroy();
  });

  it('color string', () => {
    const progress = new Progress(createDiv(), {
      width: 200,
      height: 100,
      percent: 0.6,
      barWidthRatio: 0.1,
      autoFit: false,
      color: 'green',
    });

    progress.render();

    expect(progress.chart.geometries[0].getAttribute('color').values).toEqual(['green', '#E8EDF3']);

    progress.destroy();
  });

  it('> 1, < 0', () => {
    const progress = new Progress(createDiv(), {
      width: 600,
      height: 300,
      autoFit: false,
      percent: 1.65,
    });

    progress.render();

    expect(progress.chart.getData()).toEqual([
      {
        type: 'current',
        percent: 1,
      },
      {
        type: 'target',
        percent: 0,
      },
    ]);

    progress.update({
      ...progress.options,
      percent: -1.65,
    });

    expect(progress.chart.getData()).toEqual([
      {
        type: 'current',
        percent: 0,
      },
      {
        type: 'target',
        percent: 1,
      },
    ]);

    progress.destroy();
  });

  it('change data', () => {
    const progress = new Progress(createDiv(), {
      width: 200,
      height: 100,
      percent: 0.6,
      autoFit: false,
    });

    progress.render();
    expect(progress.chart.geometries[0].elements[0].getData().percent).toBe(0.6);
    progress.changeData(0.8);
    expect(progress.chart.geometries[0].elements[0].getData().percent).toBe(0.8);

    progress.destroy();
  });
});
