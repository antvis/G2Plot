import { Bar } from '../../../../src';
import { salesByArea, subSalesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('bar', () => {
  it('x*y', () => {
    const bar = new Bar(createDiv(), {
      width: 300,
      height: 400,
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
      width: 300,
      height: 400,
      data: salesByArea,
      xField: 'sales',
      yField: 'area',
      seriesField: 'area',
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
      width: 300,
      height: 400,
      data: salesByArea,
      xField: 'sales',
      yField: 'area',
      seriesField: 'area',
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
    const bar = new Bar(createDiv('grouped bar'), {
      width: 300,
      height: 400,
      data: subSalesByArea,
      xField: 'sales',
      yField: 'area',
      seriesField: 'series',
      isGroup: true,
    });

    bar.render();

    const geometry = bar.chart.geometries[0];
    expect(geometry.getAdjust('dodge')).toMatchObject({
      xField: 'area',
      yField: 'sales',
    });
    expect(geometry.getAdjust('stack')).toBeUndefined();
  });

  it('grouped bar /w groupField', () => {
    const bar = new Bar(createDiv('grouped bar /w groupField'), {
      width: 300,
      height: 400,
      data: subSalesByArea,
      xField: 'sales',
      yField: 'area',
      seriesField: 'series',
      isGroup: true,
    });

    bar.render();

    const geometry = bar.chart.geometries[0];
    expect(geometry.getAdjust('dodge')).toMatchObject({
      xField: 'area',
      yField: 'sales',
    });
    expect(geometry.getAdjust('stack')).toBeUndefined();
  });

  it('grouped bar /w seriesField', () => {
    const bar = new Bar(createDiv('grouped bar /w seriesField'), {
      width: 300,
      height: 400,
      data: subSalesByArea,
      xField: 'sales',
      yField: 'area',
      seriesField: 'series',
      isGroup: true,
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
    const bar = new Bar(createDiv('stacked bar'), {
      width: 300,
      height: 400,
      data: subSalesByArea,
      xField: 'sales',
      yField: 'area',
      seriesField: 'series',
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

  it('stacked bar /w stackField', () => {
    const bar = new Bar(createDiv('stacked bar /w stackField'), {
      width: 300,
      height: 400,
      data: subSalesByArea,
      xField: 'sales',
      yField: 'area',
      seriesField: 'series',
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

  it('stacked bar /w seriesField', () => {
    const bar = new Bar(createDiv('stacked bar /w seriesField'), {
      width: 300,
      height: 400,
      data: subSalesByArea,
      xField: 'sales',
      yField: 'area',
      seriesField: 'series',
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

  it('grouped bar barWidthRatio/marginRatio', () => {
    const bar = new Bar(createDiv('grouped bar barWidthRatio'), {
      width: 300,
      height: 400,
      data: subSalesByArea,
      xField: 'sales',
      yField: 'area',
      isGroup: true,
      seriesField: 'series',
      barWidthRatio: 0.7,
      marginRatio: 0.3,
    });

    bar.render();

    const geometry = bar.chart.geometries[0];
    expect(geometry.getAdjust('dodge')).toMatchObject({
      xField: 'area',
      yField: 'sales',
      marginRatio: 0.3,
      dodgeRatio: 0.7,
    });
  });

  it('stacked bar barWidthRatio/marginRatio', () => {
    const bar = new Bar(createDiv('stacked bar barWidthRatio'), {
      width: 300,
      height: 400,
      data: subSalesByArea,
      xField: 'sales',
      yField: 'area',
      seriesField: 'series',
      isStack: true,
      barWidthRatio: 0.5,
    });

    bar.render();

    const geometry = bar.chart.geometries[0];
    expect(geometry.getAdjust('stack')).toMatchObject({
      xField: 'area',
      yField: 'sales',
    });
    expect(geometry.theme.columnWidthRatio).toBe(0.5);
  });

  it('default interaction', () => {
    const bar = new Bar(createDiv('default with active-region'), {
      width: 300,
      height: 400,
      data: subSalesByArea,
      xField: 'sales',
      yField: 'area',
    });

    bar.render();

    expect(bar.chart.interactions['active-region']).toBeDefined();
  });
});
