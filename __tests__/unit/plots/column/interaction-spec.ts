import { Column } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('column interaction', () => {
  const plot = new Column(createDiv('x*y'), {
    width: 400,
    height: 300,
    data: salesByArea,
    xField: 'area',
    yField: 'sales',
  });

  plot.render();

  it('brush', () => {
    plot.update({
      brush: {
        enabled: true,
      },
    });
    expect(plot.chart.interactions['brush']).toBeDefined();

    plot.update({ brush: { type: 'x' } });
    // 不同 brush 是互斥的
    expect(plot.chart.interactions['brush']).not.toBeDefined();
    expect(plot.chart.interactions['brush-x']).toBeDefined();

    plot.update({ brush: { type: 'y' } });
    expect(plot.chart.interactions['brush-x']).not.toBeDefined();
    expect(plot.chart.interactions['brush-y']).toBeDefined();

    plot.update({ brush: { type: 'y', action: 'highlight' } });
    expect(plot.chart.interactions['brush-y']).not.toBeDefined();
    expect(plot.chart.interactions['brush-y-highlight']).toBeDefined();

    plot.update({ brush: { type: 'x', action: 'highlight' } });
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
