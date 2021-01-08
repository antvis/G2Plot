import { Column } from '../../../../src';
import { salesByArea, subSalesByArea, timeColumnData } from '../../../data/sales';
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

    // 柱状图 xField 默认为 cat 类型
    // @ts-ignore
    expect(geometry.scales.area.type).toBe('cat');

    column.destroy();
  });

  it('x*y*color', () => {
    const column = new Column(createDiv('x*y*color'), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
      seriesField: 'area',
    });

    column.render();

    const geometry = column.chart.geometries[0];
    const seriesFields = geometry.getAttribute('color').getFields();

    expect(seriesFields).toHaveLength(1);
    expect(seriesFields[0]).toBe('area');

    column.destroy();
  });

  it('x*y*color with color', () => {
    const palette = ['red', 'yellow', 'green'];
    const column = new Column(createDiv('x*y*color with color'), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
      seriesField: 'area',
      color: palette,
    });

    column.render();

    const geometry = column.chart.geometries[0];
    const colorAttribute = geometry.getAttribute('color');
    const seriesFields = colorAttribute.getFields();

    expect(seriesFields).toHaveLength(1);
    expect(seriesFields[0]).toBe('area');
    geometry.elements.forEach((element, index) => {
      const color = element.getModel().color;
      expect(color).toBe(palette[index % palette.length]);
    });

    column.destroy();
  });

  it('grouped column', () => {
    const column = new Column(createDiv('grouped column'), {
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
    const legend = column.chart.getComponents().filter((co) => co.type === 'legend')[0];
    expect(legend).toBeDefined();
    expect(geometry.getAdjust('dodge')).toMatchObject({
      xField: 'area',
      yField: 'sales',
    });
    expect(geometry.getAdjust('stack')).toBeUndefined();
    expect(geometry.getAttribute('color')?.getFields()).toEqual(['series']);

    column.destroy();
  });

  it('grouped column /w groupField', () => {
    const column = new Column(createDiv('grouped column /w groupField'), {
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
    expect(geometry.getAttribute('color')?.getFields()).toEqual(['series']);

    column.destroy();
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
    expect(geometry.getAttribute('color')?.getFields()).toEqual(['series']);

    column.destroy();
  });

  it('stacked column', () => {
    const column = new Column(createDiv('stacked column'), {
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
    const legend = column.chart.getComponents().filter((co) => co.type === 'legend')[0];
    expect(legend).toBeDefined();
    expect(geometry.getAdjust('dodge')).toBeUndefined();
    expect(geometry.getAdjust('stack')).toMatchObject({
      xField: 'area',
      yField: 'sales',
    });
    expect(geometry.getAttribute('color')?.getFields()).toEqual(['series']);

    column.destroy();
  });

  it('stacked column /w stackField', () => {
    const column = new Column(createDiv('stacked column /w stackField'), {
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
    expect(geometry.getAttribute('color')?.getFields()).toEqual(['series']);

    column.destroy();
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
    expect(geometry.getAttribute('color')?.getFields()).toEqual(['series']);

    column.destroy();
  });

  it('grouped column columnWidthRatio/marginRatio', () => {
    const column = new Column(createDiv('grouped column columnWidthRatio'), {
      width: 400,
      height: 300,
      data: subSalesByArea,
      xField: 'area',
      yField: 'sales',
      isGroup: true,
      seriesField: 'series',
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

    column.destroy();
  });

  it('stacked column columnWidthRatio/marginRatio', () => {
    const column = new Column(createDiv('stacked column columnWidthRatio'), {
      width: 400,
      height: 300,
      data: subSalesByArea,
      xField: 'area',
      yField: 'sales',
      seriesField: 'series',
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

    column.destroy();
  });

  it('default interaction', () => {
    const column = new Column(createDiv('default with active-region'), {
      width: 300,
      height: 400,
      data: subSalesByArea,
      xField: 'sales',
      yField: 'area',
    });

    column.render();

    expect(column.chart.interactions['active-region']).toBeDefined();

    column.destroy();
  });

  it('x*y*cat', () => {
    const column = new Column(createDiv('x*y*cat'), {
      width: 300,
      height: 400,
      isStack: true,
      data: timeColumnData,
      xField: 'year',
      yField: 'value',
      seriesField: 'type',
    });

    column.render();
    const geometry = column.chart.geometries[0];

    expect(geometry.getAdjust('stack')).toMatchObject({
      xField: 'year',
      yField: 'value',
    });
    // 柱状图 xField 默认为 cat 类型
    // @ts-ignore
    expect(geometry.scales.year.type).toBe('cat');

    column.destroy();
  });

  it('column background', () => {
    const column = new Column(createDiv('with background'), {
      width: 300,
      height: 400,
      data: subSalesByArea,
      xField: 'sales',
      yField: 'area',
    });

    column.render();

    expect(column.options.columnBackground).not.toBeDefined();
    expect(column.chart.geometries[0].elements[0].shape.isGroup()).toBe(false);

    column.update({ columnBackground: { style: { fill: 'red' } } });
    expect(column.options.columnBackground).toBeDefined();
    expect(column.chart.geometries[0].elements[0].shape.isGroup()).toBe(true);
    //@ts-ignore
    expect(column.chart.geometries[0].elements[0].shape.getChildren()[0].attr('fill')).toBe('red');

    column.destroy();
  });

  it('theme', () => {
    const column = new Column(createDiv('theme'), {
      width: 300,
      height: 400,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
      columnWidthRatio: 0.8,
      theme: {
        styleSheet: {
          brandColor: '#FF6B3B',
          paletteQualitative10: [
            '#FF6B3B',
            '#626681',
            '#FFC100',
            '#9FB40F',
            '#76523B',
            '#DAD5B5',
            '#0E8E89',
            '#E19348',
            '#F383A2',
            '#247FEA',
          ],
          paletteQualitative20: [
            '#FF6B3B',
            '#626681',
            '#FFC100',
            '#9FB40F',
            '#76523B',
            '#DAD5B5',
            '#0E8E89',
            '#E19348',
            '#F383A2',
            '#247FEA',
            '#2BCB95',
            '#B1ABF4',
            '#1D42C2',
            '#1D9ED1',
            '#D64BC0',
            '#255634',
            '#8C8C47',
            '#8CDAE5',
            '#8E283B',
            '#791DC9',
          ],
        },
      },
    });

    column.render();

    const theme = column.chart.getTheme();
    expect(theme.defaultColor).toBe('#FF6B3B');
    expect(theme.columnWidthRatio).toBe(0.8);
  });
});
