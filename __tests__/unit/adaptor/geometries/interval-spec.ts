import { interval, P, Params } from '../../../../src';
import { IntervalGeometryOptions } from '../../../../src/adaptor/geometries';
import { createDiv } from '../../../utils/dom';

describe('adaptor - interval', () => {
  function adaptor(params: Params<IntervalGeometryOptions>): Params<IntervalGeometryOptions> {
    const { chart, options } = params;
    const { data } = options;

    chart.data(data);

    // 直接使用 geometry 进行测试
    interval({
      chart,
      options: {
        ...options,
        interval: {},
        args: { columnBackground: options.columnBackground },
      },
    });
    return params;
  }

  function getPlot() {
    const plot = new P(
      createDiv(),
      {
        width: 400,
        height: 300,
        data: [
          { type: '1', value: 10 },
          { type: '2', value: 12 },
        ],
        appendPadding: 10,
        xField: 'type',
        yField: 'value',
        mapping: {},
      },
      adaptor
    );

    plot.render();
    return plot;
  }

  it('columnBackground', () => {
    const plot = getPlot();
    expect(plot.chart.geometries[0].elements[0].shape.isGroup()).toBe(false);

    plot.update({
      columnBackground: { style: { fill: 'red' } },
    });
    expect(plot.options.columnBackground).toBeDefined();
    // @ts-ignore
    const shapes = plot.chart.geometries[0].elements[0].shape.getChildren();
    expect(shapes.length).toBe(2);
    expect(shapes[0].attr('fill')).toBe('red');

    plot.update({ columnBackground: null });
    expect(plot.chart.geometries[0].elements[0].shape.isGroup()).toBe(false);
  });

  it('column-width', () => {
    const plot = getPlot();

    plot.update({
      minColumnWidth: 20,
      maxColumnWidth: 20,
    });
    const elements = plot.chart.geometries[0].elements;
    expect(elements.length).toBe(2);
    expect(elements[0].shape.getCanvasBBox().width).toBe(20);
    expect(elements[1].shape.getCanvasBBox().width).toBe(20);
  });
});
