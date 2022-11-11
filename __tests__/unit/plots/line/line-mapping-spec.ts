import { Line } from '../../../../src';
import { salesByArea, subSalesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('line shape', () => {
  it('undefined shape', () => {
    const plot = new Line(createDiv('undefined mapping'), {
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
    });

    expect(() => plot.render()).not.toThrow();
  });

  it('shape mapping, value', () => {
    const plot = new Line(createDiv('shape mapping'), {
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
      lineShape: 'hvh',
    });
    plot.render();

    expect(plot.chart.geometries[0].attributes.shape.values).toEqual(['hvh']);
  });

  it('shape mapping, callback', () => {
    const shapeCallback = (datum) => ({ 公司: 'smooth', 小型企业: 'line', 消费者: 'hv' }[datum.series]);
    const plot = new Line(createDiv('shape mapping'), {
      data: subSalesByArea,
      xField: 'area',
      yField: 'sales',
      seriesField: 'series',
      lineShape: shapeCallback,
    });
    plot.render();

    plot.chart.geometries[0].elements.forEach((element) => {
      const model = element.getModel();
      expect(model.shape).toBe(shapeCallback(model.data[0]));
    });
    plot.destroy();
  });
});
