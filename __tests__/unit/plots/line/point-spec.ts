import { Line } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('line', () => {
  const data = partySupport.filter((o) => ['FF', 'Lab'].includes(o.type));
  const line = new Line(createDiv(), {
    width: 400,
    height: 300,
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    appendPadding: 10,
  });

  line.render();

  it('x*y*color point', () => {
    expect(line.chart.geometries.length).toBe(1);

    let xValue;
    let yValue;
    let colorValue;
    line.update({
      ...line.options,
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
    expect(line.chart.geometries.length).toBe(2);
    expect(xValue).toBe('25/01/2018');
    expect(yValue).toBe(400);
    expect(colorValue).toBe('Lab');

    const point = line.chart.geometries[1];
    expect(point.shapeType).toBe('point');
    // @ts-ignore
    expect(point.attributeOption.size.values).toEqual([2]);
    // @ts-ignore
    expect(point.attributeOption.shape.values).toEqual(['circle']);
  });

  it('point shape', () => {
    line.update({
      ...line.options,
      point: {
        ...line.options.point,
        shape: ({ type }) => {
          return type === data[0].type ? 'square' : 'circe';
        },
      },
    });
    const point = line.chart.geometries[1];
    // @ts-ignore 回调的情况下，为 undefined
    expect(point.attributeOption.shape.values).toBeUndefined();
    // @ts-ignore
    expect(point.elements[0].shapeType).toEqual('square');
  });

  afterAll(() => {
    line.destroy();
  });
});
