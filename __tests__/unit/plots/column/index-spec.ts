import { Column } from '../../../../src';
import { salesByArea, subSalesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('column', () => {
  it('x*y', () => {
    const column = new Column(createDiv('x*y'), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
    });

    column.render();

    const geometry = column.chart.geometries[0];
    const positionFields = geometry.getAttribute('position').getFields();

    // 类型
    expect(geometry.type).toBe('interval');
    // 图形元素个数
    expect(column.chart.geometries[0].elements.length).toBe(salesByArea.length);
    // x & y
    expect(positionFields).toHaveLength(2);
    expect(positionFields[0]).toBe('area');
    expect(positionFields[1]).toBe('sales');
  });

  it('x*y*color', () => {
    const column = new Column(createDiv('x*y*color'), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
      colorField: 'area',
    });

    column.render();

    const geometry = column.chart.geometries[0];
    const colorFields = geometry.getAttribute('color').getFields();

    expect(colorFields).toHaveLength(1);
    expect(colorFields[0]).toBe('area');
  });

  it('x*y*color with color', () => {
    const palette = ['red', 'yellow', 'green'];
    const column = new Column(createDiv('x*y*color with color'), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
      colorField: 'area',
      color: palette,
    });

    column.render();

    const geometry = column.chart.geometries[0];
    const colorAttribute = geometry.getAttribute('color');
    const colorFields = colorAttribute.getFields();

    expect(colorFields).toHaveLength(1);
    expect(colorFields[0]).toBe('area');
    geometry.elements.forEach((element, index) => {
      const color = element.getModel().color;
      expect(color).toBe(palette[index % palette.length]);
    });
  });

  it('grouped column', () => {
    const column = new Column(createDiv('grouped column'), {
      width: 400,
      height: 300,
      data: subSalesByArea,
      xField: 'area',
      yField: 'sales',
      colorField: 'series',
      isGroup: true,
    });

    column.render();

    const geometry = column.chart.geometries[0];
    expect(geometry.getAdjust('dodge')).toMatchObject({
      xField: 'area',
      yField: 'sales',
    });
    expect(geometry.getAdjust('stack')).toBeUndefined();
  });

  it('grouped column /w groupField', () => {
    const column = new Column(createDiv('grouped column /w groupField'), {
      width: 400,
      height: 300,
      data: subSalesByArea,
      xField: 'area',
      yField: 'sales',
      groupField: 'series',
      isGroup: true,
    });

    column.render();

    const geometry = column.chart.geometries[0];
    expect(geometry.getAdjust('dodge')).toMatchObject({
      xField: 'area',
      yField: 'sales',
    });
    expect(geometry.getAdjust('stack')).toBeUndefined();
  });

  it('grouped column /w seriesField', () => {
    const column = new Column(createDiv('grouped column /w seriesField'), {
      width: 400,
      height: 300,
      data: subSalesByArea,
      xField: 'area',
      yField: 'sales',
      seriesField: 'series',
      isGroup: true,
    });

    column.render();

    const geometry = column.chart.geometries[0];
    expect(geometry.getAdjust('dodge')).toMatchObject({
      xField: 'area',
      yField: 'sales',
    });
    expect(geometry.getAdjust('stack')).toBeUndefined();
  });

  it('stacked column', () => {
    const column = new Column(createDiv('stacked column'), {
      width: 400,
      height: 300,
      data: subSalesByArea,
      xField: 'area',
      yField: 'sales',
      colorField: 'series',
      isStack: true,
    });

    column.render();

    const geometry = column.chart.geometries[0];
    expect(geometry.getAdjust('dodge')).toBeUndefined();
    expect(geometry.getAdjust('stack')).toMatchObject({
      xField: 'area',
      yField: 'sales',
    });
  });

  it('stacked column /w stackField', () => {
    const column = new Column(createDiv('stacked column /w stackField'), {
      width: 400,
      height: 300,
      data: subSalesByArea,
      xField: 'area',
      yField: 'sales',
      stackField: 'series',
      isStack: true,
    });

    column.render();

    const geometry = column.chart.geometries[0];
    expect(geometry.getAdjust('dodge')).toBeUndefined();
    expect(geometry.getAdjust('stack')).toMatchObject({
      xField: 'area',
      yField: 'sales',
    });
  });

  it('stacked column /w seriesField', () => {
    const column = new Column(createDiv('stacked column /w seriesField'), {
      width: 400,
      height: 300,
      data: subSalesByArea,
      xField: 'area',
      yField: 'sales',
      seriesField: 'series',
      isStack: true,
    });

    column.render();

    const geometry = column.chart.geometries[0];
    expect(geometry.getAdjust('dodge')).toBeUndefined();
    expect(geometry.getAdjust('stack')).toMatchObject({
      xField: 'area',
      yField: 'sales',
    });
  });

  it('grouped column columnWidthRatio/marginRatio', () => {
    const column = new Column(createDiv('grouped column columnWidthRatio'), {
      width: 400,
      height: 300,
      data: subSalesByArea,
      xField: 'area',
      yField: 'sales',
      isGroup: true,
      colorField: 'series',
      columnWidthRatio: 0.7,
      marginRatio: 0.1,
    });

    column.render();

    const geometry = column.chart.geometries[0];
    expect(geometry.getAdjust('dodge')).toMatchObject({
      xField: 'area',
      yField: 'sales',
      marginRatio: 0.1,
      dodgeRatio: 0.7,
    });
  });

  it('stacked column columnWidthRatio/marginRatio', () => {
    const column = new Column(createDiv('stacked column columnWidthRatio'), {
      width: 400,
      height: 300,
      data: subSalesByArea,
      xField: 'area',
      yField: 'sales',
      colorField: 'series',
      isStack: true,
      columnWidthRatio: 0.7,
    });

    column.render();

    const geometry = column.chart.geometries[0];
    expect(geometry.getAdjust('stack')).toMatchObject({
      xField: 'area',
      yField: 'sales',
    });
    expect(geometry.theme.columnWidthRatio).toBe(0.7);
  });
});
