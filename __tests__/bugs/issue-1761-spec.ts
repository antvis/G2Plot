import { Area, Line } from '../../src';
import { partySupport } from '../data/party-support';
import { createDiv } from '../utils/dom';

describe('#1761', () => {
  it('Line: point color should be same with line color', () => {
    const line = new Line(createDiv('point color should be same with line color'), {
      height: 300,
      width: 400,
      autoFit: false,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      smooth: true,
      color: ['red', 'green'],
    });

    line.render();

    expect(line.chart.geometries.length).toBe(1);

    line.update({
      ...line.options,
      point: {},
    });

    // @ts-ignore
    expect(line.chart.geometries[1].attributeOption.color.values).toEqual(['red', 'green']);

    line.update({
      ...line.options,
      point: {
        color: ['blue', 'black'],
      },
    });

    // @ts-ignore
    expect(line.chart.geometries[1].attributeOption.color.values).toEqual(['blue', 'black']);

    line.destroy();
  });

  it('Area: point, line color should be same with area color', () => {
    const area = new Area(createDiv('point/line color should be same with area color'), {
      height: 300,
      width: 400,
      autoFit: false,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      smooth: true,
      color: ['red', 'green'],
    });

    area.render();

    expect(area.chart.geometries.length).toBe(2);

    area.update({
      ...area.options,
      line: {},
      point: {},
    });

    // @ts-ignore
    expect(area.chart.geometries[1].attributeOption.color.values).toEqual(['red', 'green']);
    // @ts-ignore
    expect(area.chart.geometries[2].attributeOption.color.values).toEqual(['red', 'green']);

    area.update({
      ...area.options,
      line: {
        color: ['yellow', 'grey'],
      },
      point: {
        color: ['blue', 'black'],
      },
    });

    // @ts-ignore
    expect(area.chart.geometries[1].attributeOption.color.values).toEqual(['yellow', 'grey']);
    // @ts-ignore
    expect(area.chart.geometries[2].attributeOption.color.values).toEqual(['blue', 'black']);

    area.destroy();
  });
});
