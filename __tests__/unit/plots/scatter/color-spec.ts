import { Scatter } from '../../../../src';
import { data } from '../../../data/gender';
import { createDiv } from '../../../utils/dom';

describe('scatter', () => {
  it('color: string options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      color: 'red',
      xAxis: {
        nice: true,
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;

    expect(elements.length).toBe(507);
    expect(elements[0].getModel().color).toBe('red');

    scatter.destroy();
  });

  it('color: string array options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      colorField: 'gender',
      color: ['#e764ff', '#2b0033'],
      xAxis: {
        nice: true,
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;

    // @ts-ignore
    expect(geometry.attributeOption.color.values.length).toBe(2);
    expect(elements.length).toBe(507);
    expect(elements[0].getModel().color).not.toBe('red');

    scatter.destroy();
  });

  const scatter = new Scatter(createDiv(), {
    width: 400,
    height: 300,
    appendPadding: 10,
    data: [
      { x: 10, y: 10, type: 'one', city: 'beijing' },
      { x: 40, y: 10, type: 'two', city: 'beijing' },
      { x: 50, y: 10, type: 'one', city: 'hangzhou' },
      { x: 60, y: 10, type: 'two', city: 'hangzhou' },
      { x: 40, y: 10, type: 'three', city: 'hangzhou' },
    ],
    xField: 'x',
    yField: 'y',
    colorField: 'type',
    shapeField: 'city',
    color: ['#e764ff', '#2b0033'],
    shape: ['circle', 'square'],
  });

  scatter.render();

  it('color mapping with shape mapping', () => {
    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;

    // @ts-ignore
    expect(geometry.attributeOption.color.values.length).toBe(2);
    expect(elements.length).toBe(5);
    expect(elements[0].getModel().color).not.toBe('red');
    expect(elements[0].getModel().color).toBe('#e764ff');
    expect(elements[0].shape.attr('fill')).toBe('#e764ff');
    expect(elements[0].getModel().shape).toBe('circle');
    expect(elements[2].getModel().shape).toBe('square');
  });

  it('color mapping with shape mapping, colorAttr is callback', () => {
    scatter.update({
      color: ({ type }) => {
        return type === 'three' ? 'red' : undefined;
      },
    });
    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;

    expect(elements.length).toBe(5);
    expect(elements[4].shape.attr('fill')).toBe('red');
    expect(elements[0].shape.attr('fill')).toBe(scatter.chart.getTheme().colors10[0]);
    expect(elements[0].getModel().shape).toBe('circle');
    expect(elements[2].getModel().shape).toBe('square');
  });

  it('color mapping with shape mapping, legends', () => {
    const legendController = scatter.chart.getController('legend');
    expect(legendController.getComponents().length).toBe(2);
    expect(legendController.getComponents()[0].component.get('items').length).toBe(3);
    expect(legendController.getComponents()[1].component.get('items').length).toBe(2);
  });

  afterAll(() => {
    scatter.destroy();
  });
});
