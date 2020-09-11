import { Line } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('line', () => {
  it('x*y and style', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      lineStyle: {
        lineDash: [2, 2],
      },
      appendPadding: 10,
    });

    line.render();

    const geometry = line.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('lineDash')).toEqual([2, 2]);

    line.update({
      ...line.options,
      lineStyle: () => {
        return { lineDash: [4, 4] };
      },
    });
    expect(line.chart.geometries[0].elements[0].shape.attr('lineDash')).toEqual([4, 4]);
  });

  it('x*y*color and style', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      lineStyle: {
        lineDash: [2, 2],
      },
      appendPadding: 10,
    });

    line.render();

    const geometry = line.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('lineDash')).toEqual([2, 2]);

    line.update({
      ...line.options,
      lineStyle: ({ type }) => {
        if (type === 'FF') return { lineDash: [4, 4] };
      },
    });
    expect(line.chart.geometries[0].elements[0].shape.attr('lineDash')).toEqual([4, 4]);
    expect(line.chart.geometries[0].elements[1].shape.attr('lineDash')).toEqual(undefined);
  });
});
