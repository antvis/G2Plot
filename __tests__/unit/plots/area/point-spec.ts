import { Area } from '../../../../src';
import { findGeometry, getAllGeometriesRecursively } from '../../../../src/utils';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('area', () => {
  it('x*y*color point', () => {
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
    expect(getAllGeometriesRecursively(area.chart).length).toBe(2);

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
    expect(getAllGeometriesRecursively(area.chart).length).toBe(3);
    expect(xValue).toBe('25/01/2018');
    expect(yValue).toBe(400);
    expect(colorValue).toBe('Lab');

    const point = findGeometry(area.chart, 'point');
    expect(point.shapeType).toBe('point');
    // @ts-ignore
    expect(point.attributeOption.size.values).toEqual([2]);
    // @ts-ignore
    // expect(point.attributeOption.shape.values).toEqual(['circle']);

    area.destroy();
  });
});
