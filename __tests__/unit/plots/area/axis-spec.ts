import { Area } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('area', () => {
  it('x*y*color and axis options', () => {
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      color: ['blue', 'red'],
      appendPadding: 10,
      xAxis: {
        label: {
          style: {
            fill: 'red',
          },
        },
      },
      yAxis: {
        tickCount: 3,
      },
    });

    area.render();

    const geometry = area.chart.geometries[0];
    const elements = geometry.elements;

    expect(elements.length).toBe(2);
    expect(elements[0].getModel().color).toBe('blue');
    expect(elements[1].getModel().color).toBe('red');

    expect(geometry.scales.value.min).toBe(0);
    expect(geometry.scales.value.max).toBe(6000);

    // @ts-ignore
    expect(area.chart.options.axes.date.label.style.fill).toBe('red');

    area.destroy();
  });
});
