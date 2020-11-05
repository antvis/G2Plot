import { Line } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('line', () => {
  it('x*y*color and axis options', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      color: ['blue', 'red'],
      appendPadding: 10,
      connectNulls: true,
      meta: {
        value: {
          min: 0,
          max: 5000,
        },
      },
      xAxis: {
        label: {
          style: {
            fill: 'red',
          },
        },
      },
      yAxis: {
        nice: false,
        tickCount: 3,
        min: 500,
      },
    });

    line.render();

    const geometry = line.chart.geometries[0];
    const elements = geometry.elements;
    // @ts-ignore
    expect(geometry.connectNulls).toBe(true);
    expect(elements.length).toBe(2);
    expect(elements[0].getModel().color).toBe('blue');
    expect(elements[1].getModel().color).toBe('red');

    expect(geometry.scales.value.min).toBe(500);
    expect(geometry.scales.value.max).toBe(5000);

    // @ts-ignore
    expect(line.chart.options.axes.date.label.style.fill).toBe('red');

    line.destroy();
  });
});
