import { Bar } from '../../../../src';
import { salesByArea, subSalesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('bar', () => {
  it('x*y', () => {
    const bar = new Bar(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'sales',
      yField: 'area',
    });

    bar.render();

    const geometry = bar.chart.geometries[0];
    const positionFields = geometry.getAttribute('position').getFields();

    // 类型
    expect(geometry.type).toBe('interval');
    // 图形元素个数
    expect(bar.chart.geometries[0].elements.length).toBe(salesByArea.length);
    // x & y
    expect(positionFields).toHaveLength(2);
    expect(positionFields[0]).toBe('area');
    expect(positionFields[1]).toBe('sales');
  });

  it('x*y*color', () => {
    const bar = new Bar(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'sales',
      yField: 'area',
      colorField: 'area',
    });

    bar.render();

    const geometry = bar.chart.geometries[0];
    const colorFields = geometry.getAttribute('color').getFields();

    expect(colorFields).toHaveLength(1);
    expect(colorFields[0]).toBe('area');
  });

  it('x*y*color with color', () => {
    const palette = ['red', 'yellow', 'green'];
    const bar = new Bar(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'sales',
      yField: 'area',
      colorField: 'area',
      color: palette,
    });

    bar.render();

    const geometry = bar.chart.geometries[0];
    const colorAttribute = geometry.getAttribute('color');
    const colorFields = colorAttribute.getFields();

    expect(colorFields).toHaveLength(1);
    expect(colorFields[0]).toBe('area');
    geometry.elements.forEach((element, index) => {
      const color = element.getModel().color;
      expect(color).toBe(palette[index % palette.length]);
    });
  });

  it('grouped bar', () => {
    const bar = new Bar(createDiv('grouped column'), {
      width: 400,
      height: 300,
      data: subSalesByArea,
      xField: 'sales',
      yField: 'area',
      colorField: 'series',
    });

    bar.render();

    const geometry = bar.chart.geometries[0];
    expect(geometry.getAdjust('dodge')).toMatchObject({
      xField: 'area',
      yField: 'sales',
    });
    expect(geometry.getAdjust('stack')).toBeUndefined();
  });

  it('stacked bar', () => {
    const bar = new Bar(createDiv('stacked column'), {
      width: 400,
      height: 300,
      data: subSalesByArea,
      xField: 'sales',
      yField: 'area',
      colorField: 'series',
      isStack: true,
    });

    bar.render();

    const geometry = bar.chart.geometries[0];
    expect(geometry.getAdjust('dodge')).toBeUndefined();
    expect(geometry.getAdjust('stack')).toMatchObject({
      xField: 'area',
      yField: 'sales',
    });
  });
});
