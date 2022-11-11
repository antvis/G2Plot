import { getInteraction } from '@antv/g2';
import { Scatter } from '../../../../src';
import { data } from '../../../data/gender';
import { createDiv } from '../../../utils/dom';

describe('scatter: register interaction', () => {
  const plot = new Scatter(createDiv(), {
    width: 400,
    height: 300,
    appendPadding: 10,
    data,
    xField: 'weight',
    yField: 'height',
    sizeField: 'weight',
    size: [5, 10],
    colorField: 'gender',
    xAxis: {
      nice: true,
    },
    interactions: [
      {
        type: 'drag-move',
      },
    ],
  });

  plot.render();

  it('define: drag-move', () => {
    const statisticInteraction = getInteraction('drag-move');
    expect(statisticInteraction).toBeDefined();
  });

  it('brush', () => {
    plot.update({
      brush: {
        enabled: true,
      },
    });
    expect(plot.chart.interactions['brush']).toBeDefined();

    plot.update({ brush: { type: 'circle' } });
    expect(plot.chart.interactions['brush']).toBeDefined();

    plot.update({ brush: { type: 'x-rect' } });
    // 不同 brush 是互斥的
    expect(plot.chart.interactions['brush']).not.toBeDefined();
    expect(plot.chart.interactions['brush-x']).toBeDefined();

    plot.update({ brush: { type: 'path' } });
    expect(plot.chart.interactions['brush-x']).not.toBeDefined();
    expect(plot.chart.interactions['brush']).toBeDefined();

    plot.update({ brush: { type: 'y-rect' } });
    expect(plot.chart.interactions['brush-x']).not.toBeDefined();
    expect(plot.chart.interactions['brush-y']).toBeDefined();

    plot.update({ brush: { type: 'y-rect', action: 'highlight' } });
    expect(plot.chart.interactions['brush-y']).not.toBeDefined();
    expect(plot.chart.interactions['brush-y-highlight']).toBeDefined();

    plot.update({ brush: { type: 'x-rect', action: 'highlight' } });
    expect(plot.chart.interactions['brush-x']).not.toBeDefined();
    expect(plot.chart.interactions['brush-y-highlight']).not.toBeDefined();
    expect(plot.chart.interactions['brush-x-highlight']).toBeDefined();

    plot.update({ brush: { type: 'rect', action: 'highlight' } });
    expect(plot.chart.interactions['brush-x']).not.toBeDefined();
    expect(plot.chart.interactions['brush']).not.toBeDefined();
    expect(plot.chart.interactions['brush-highlight']).toBeDefined();
  });

  afterAll(() => {
    plot.destroy();
  });
});
