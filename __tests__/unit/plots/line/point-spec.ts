import { Line } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('line', () => {
  it('x*y*color point', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      appendPadding: 10,
    });

    line.render();
    expect(line.chart.geometries.length).toBe(1);

    let xValue;
    let yValue;
    let colorValue;
    line.update({
      ...line.options,
      point: {
        size: 2,
        shape: 'circle',
        style: (x: string, y: number, color: string) => {
          xValue = x;
          yValue = y;
          colorValue = color;
          return {
            fill: color === 'FF' ? 'red' : 'blue',
          };
        },
      },
    });
    expect(line.chart.geometries.length).toBe(2);
    expect(xValue).toBe('25/01/2018');
    expect(yValue).toBe(400);
    expect(colorValue).toBe('Lab');

    const point = line.chart.geometries[1];
    expect(point.shapeType).toBe('point');
    // @ts-ignore
    expect(point.attributeOption.size.values).toEqual([2]);
    // @ts-ignore
    // expect(point.attributeOption.shape.values).toEqual(['circle']);
  });
});
