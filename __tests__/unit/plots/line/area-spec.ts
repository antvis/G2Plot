import { Line } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('line with area', () => {
  it('x*y*color point', () => {
    const plot = new Line(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      appendPadding: 10,
    });

    plot.render();
    expect(plot.chart.geometries.length).toBe(1);

    let xValue;
    let yValue;
    let colorValue;
    plot.update({
      ...plot.options,
      point: {
        style: ({ date, value, type }) => {
          xValue = date;
          yValue = value;
          colorValue = type;
          return {
            fill: type === 'FF' ? 'red' : 'blue',
          };
        },
      },
      area: {
        style: {
          opacity: 0.15,
        },
      },
    });
    expect(plot.chart.geometries.length).toBe(3);
    expect(xValue).toBe('25/01/2018');
    expect(yValue).toBe(400);
    expect(colorValue).toBe('Lab');

    const area = plot.chart.geometries[2];
    expect(area.elements[0].shape.attr('opacity')).toBe(0.15);

    plot.update({
      ...plot.options,
      point: null,
    });
    expect(plot.chart.geometries.length).toBe(2);
    expect(plot.chart.geometries[1].type).toBe('area');

    plot.destroy();
  });
});
