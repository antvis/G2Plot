import { Area } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('area', () => {
  it('x*y and style', () => {
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      areaStyle: {
        fillOpacity: 0.2,
      },
      appendPadding: 10,
    });

    area.render();

    const geometry = area.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fillOpacity')).toBe(0.2);

    area.update({
      ...area.options,
      areaStyle: () => {
        return { fillOpacity: 0.3 };
      },
    });
    expect(area.chart.geometries[0].elements[0].shape.attr('fillOpacity')).toBe(0.3);

    area.destroy();
  });

  it('x*y*color and style', () => {
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      areaStyle: {
        fillOpacity: 0.2,
      },
      appendPadding: 10,
    });

    area.render();

    const geometry = area.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fillOpacity')).toBe(0.2);

    area.update({
      ...area.options,
      areaStyle: ({ type }) => {
        if (type === 'FF') return { fillOpacity: 0.3 };
      },
    });
    expect(area.chart.geometries[0].elements[0].shape.attr('fillOpacity')).toBe(0.3);
    expect(area.chart.geometries[0].elements[1].shape.attr('fillOpacity')).toBe(0.25);

    area.destroy();
  });
});
