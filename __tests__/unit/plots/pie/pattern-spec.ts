import { Pie } from '../../../../src';
import { POSITIVE_NEGATIVE_DATA } from '../../../data/common';
import { createDiv } from '../../../utils/dom';

describe('pie', () => {
  const data = POSITIVE_NEGATIVE_DATA.filter((o) => o.value > 0).map((d, idx) =>
    idx === 1 ? { ...d, type: 'item1' } : d
  );

  it('pattern: obj', () => {
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 300,
      data,
      angleField: 'value',
      colorField: 'type',
      color: ['yellow', 'lightgreen', 'lightblue', 'pink'],
      radius: 0.8,
      innerRadius: 0.5,
      pattern: {
        type: 'line',
      },
    });

    pie.render();

    const geometry = pie.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    pie.update({
      pattern: {
        type: 'dot',
      },
    });

    expect(pie.chart.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(pie.chart.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(pie.chart.geometries[0].elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    pie.destroy();
  });

  it('pattern: callback', () => {
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 300,
      data,
      angleField: 'value',
      colorField: 'type',
      color: ['green', 'lightgreen', 'lightblue', 'pink'],
      radius: 0.8,
      innerRadius: 0.5,
      pattern: (d) => {
        if (d.type === 'pc') {
          return { type: 'line' };
        } else if (d.type === 'pa') {
          return { type: 'dot' };
        }
      },
    });

    pie.render();

    const geometry = pie.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(false);
    expect(elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    pie.update({
      pattern: (d) => {
        if (d.type === 'item1') {
          return { type: 'line' };
        }
      },
    });

    expect(pie.chart.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(false);
    expect(pie.chart.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(pie.chart.geometries[0].elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    pie.destroy();
  });
});
