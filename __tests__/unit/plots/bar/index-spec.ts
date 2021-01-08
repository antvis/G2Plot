import { Bar } from '../../../../src';
import { salesByArea, subSalesByArea, timeColumnData } from '../../../data/sales';
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

    // 默认 yField 为 cat 类型
    // @ts-ignore
    expect(geometry.scales.area.type).toBe('cat');

    bar.destroy();
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

    bar.destroy();
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

    bar.destroy();
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

    bar.destroy();
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

    bar.destroy();
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

    bar.destroy();
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

    bar.destroy();
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

    bar.destroy();
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

    bar.destroy();
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

    bar.destroy();
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

    bar.destroy();
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

    bar.destroy();
  });

  it('x*y*cat', () => {
    const bar = new Bar(createDiv('x*y*cat'), {
      width: 300,
      height: 400,
      data: timeColumnData,
      isStack: true,
      xField: 'value',
      yField: 'year',
      seriesField: 'type',
    });

    bar.render();
    const geometry = bar.chart.geometries[0];
    expect(geometry.getAdjust('stack')).toMatchObject({
      xField: 'year',
      yField: 'value',
    });
    // 默认 yField 为 cat 类型
    // @ts-ignore
    expect(geometry.scales.year.type).toBe('cat');

    bar.destroy();
  });

  it('theme', () => {
    const bar = new Bar(createDiv('theme'), {
      width: 300,
      height: 400,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
      barWidthRatio: 0.1,
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

    bar.render();

    const theme = bar.chart.getTheme();
    expect(theme.defaultColor).toBe('#FF6B3B');
    expect(theme.columnWidthRatio).toBe(0.1);
  });

  function getBar(isGroup: boolean, isStack: boolean) {
    const bar = new Bar(createDiv('group'), {
      width: 300,
      height: 400,
      data: subSalesByArea,
      yField: 'area',
      xField: 'sales',
      seriesField: 'series',
      isGroup,
      isStack,
    });
    bar.render();
    return bar;
  }

  it('legend/tooltip reversed, grouped', () => {
    const bar = getBar(true, false);
    // @ts-ignore
    expect(bar.chart.getOptions().legends['series'].reversed).toBe(true);
    // @ts-ignore
    expect(bar.chart.getOptions().tooltip.reversed).toBe(true);
  });

  it('legend/tooltip reversed, stacked', () => {
    const bar = getBar(false, true);
    // @ts-ignore
    expect(bar.chart.getOptions().legends['series'].reversed).toBe(false);
    // @ts-ignore
    expect(bar.chart.getOptions().tooltip?.reversed).toBe(false);
  });

  it('bar background', () => {
    const bar = getBar(false, false);
    expect(bar.options.barBackground).not.toBeDefined();
    expect(bar.chart.geometries[0].elements[0].shape.isGroup()).toBe(false);

    bar.update({ barBackground: { style: { fill: 'red' } } });
    expect(bar.options.barBackground).toBeDefined();
    expect(bar.chart.geometries[0].elements[0].shape.isGroup()).toBe(true);
    //@ts-ignore
    expect(bar.chart.geometries[0].elements[0].shape.getChildren()[0].attr('fill')).toBe('red');

    bar.destroy();
  });
});
