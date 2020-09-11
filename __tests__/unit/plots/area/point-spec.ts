import { Geometry } from '@antv/g2';
import { Area } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('area', () => {
  it.only('x*y*color point', () => {
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      appendPadding: 10,
    });

    area.render();
    expect(area.chart.geometries.length).toBe(1);

    let xValue;
    let yValue;
    let colorValue;
    area.update({
      ...area.options,
      point: {
        size: 2,
        shape: 'circle',
        style: ({ date, value, type }) => {
          xValue = date;
          yValue = value;
          colorValue = type;
          return {
            fill: type === 'FF' ? 'red' : 'blue',
          };
        },
      },
    });
    expect(area.chart.geometries.length).toBe(2);
    expect(xValue).toBe('25/01/2018');
    expect(yValue).toBe(400);
    expect(colorValue).toBe('Lab');

    const point = area.chart.geometries.find((g: Geometry) => g.type === 'point');
    expect(point.shapeType).toBe('point');
    // @ts-ignore
    expect(point.attributeOption.size.values).toEqual([2]);
    // @ts-ignore
    // expect(point.attributeOption.shape.values).toEqual(['circle']);
  });
});
