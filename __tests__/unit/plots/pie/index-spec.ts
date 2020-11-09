import { Pie } from '../../../../src';
import { POSITIVE_NEGATIVE_DATA } from '../../../data/common';
import { createDiv } from '../../../utils/dom';

describe('pie', () => {
  const data = POSITIVE_NEGATIVE_DATA.filter((o) => o.value > 0).map((d, idx) =>
    idx === 1 ? { ...d, type: 'item1' } : d
  );

  it('angleField with colorField: multiple colors', () => {
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 300,
      data,
      angleField: 'value',
      colorField: 'type',
      color: ['blue', 'red', 'yellow', 'lightgreen', 'lightblue', 'pink'],
      radius: 0.8,
    });

    pie.render();

    const geometry = pie.chart.geometries[0];
    const elements = geometry.elements;
    // @ts-ignore
    expect(elements.length).toBe(data.length);
    // 绘图数据
    expect(elements[0].getModel().style?.fill || elements[0].getModel().color).toBe('blue');
    expect(elements[1].getModel().style?.fill || elements[1].getModel().color).toBe('red');

    pie.destroy();
  });

  it('no radius', () => {
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 300,
      data,
      angleField: 'value',
      colorField: 'type',
    });

    pie.render();

    const coordinate = pie.chart.getCoordinate();
    const { radius } = coordinate;
    const polarRadius = coordinate.getRadius();
    expect(radius).toBeUndefined();
    expect(polarRadius).toBeGreaterThan(0);

    pie.destroy();
  });

  it('innerRadius', () => {
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 300,
      data,
      angleField: 'value',
      colorField: 'type',
      color: ['blue', 'red', 'yellow', 'lightgreen', 'lightblue', 'pink'],
      radius: 0.8,
      innerRadius: 0.5,
    });

    pie.render();

    const coordinate = pie.chart.getCoordinate();
    const { innerRadius, radius } = coordinate;
    expect(innerRadius).toBe((radius / 0.8) * 0.5);

    pie.destroy();
  });

  it('pieStyle: custom style of pie', () => {
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 300,
      data,
      angleField: 'value',
      colorField: 'type',
      color: ['blue', 'red', 'yellow', 'lightgreen', 'lightblue', 'pink'],
      radius: 0.8,
      innerRadius: 0.5,
      pieStyle: {
        fill: 'red',
        lineWidth: 3,
        stroke: 'yellow',
      },
    });

    pie.render();

    const geometry = pie.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].getModel().style?.fill).toBe('red');
    expect(elements[1].getModel().style?.fill).toBe('red');
    expect(elements[1].getModel().style?.lineWidth).toBe(3);
    expect(elements[1].getModel().style?.stroke).toBe('yellow');

    pie.destroy();
  });

  it('pieStyle: with callback', () => {
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 300,
      data,
      angleField: 'value',
      colorField: 'type',
      color: ['blue', 'red', 'yellow', 'lightgreen', 'lightblue', 'pink'],
      radius: 0.8,
      innerRadius: 0.5,
      pieStyle: ({ type }) => ({
        fill: type === 'item1' ? 'blue' : 'red',
        lineWidth: 3,
        stroke: 'yellow',
      }),
    });

    pie.render();

    const geometry = pie.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].getModel().style?.fill).toBe('red');
    expect(elements[1].getModel().style?.fill).toBe('blue');
    expect(elements[2].getModel().style?.fill).toBe('red');

    pie.destroy();
  });

  it('pie: annotation animate default to false', () => {
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 300,
      data,
      angleField: 'value',
      colorField: 'type',
    });
    pie.render();
    expect(pie.chart.getTheme().components.annotation.text.animate).toBe(false);

    pie.update({ ...pie.options, theme: { color: 'red' } });
    expect(pie.chart.getTheme().components.annotation.text.animate).toBe(false);

    pie.update({ ...pie.options, theme: { components: { annotation: { text: { animate: true } } } } });
    expect(pie.chart.getTheme().components.annotation.text.animate).toBe(true);

    pie.destroy();
  });
});
