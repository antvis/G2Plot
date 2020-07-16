import { Line } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('line', () => {
  it('x*y and label', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      appendPadding: 10,
      label: {
        layout: {
          type: 'overlap',
        },
      },
    });

    line.render();
    // @ts-ignore
    expect(line.chart.geometries[0].labelOption.cfg).toEqual({
      layout: {
        type: 'overlap',
      },
    });

    line.update({
      ...line.options,
      label: false,
    });
    // @ts-ignore
    window.line = line;
    // @ts-ignore
    expect(line.chart.geometries[0].labelOption).toBe(false);
  });

  it('x*y*color and label', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      appendPadding: 10,
      label: {
        layout: {
          type: 'overlap',
        },
      },
    });

    line.render();
    // @ts-ignore
    expect(line.chart.geometries[0].labelOption.cfg).toEqual({
      layout: {
        type: 'overlap',
      },
    });
  });
});
