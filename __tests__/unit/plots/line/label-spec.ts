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
    expect(line.chart.geometries[0].labelOption).toBe(false);

    line.destroy();
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

    line.destroy();
  });

  it('default layout, off', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      appendPadding: 10,
    });

    line.render();

    expect(line.chart.geometries[0].labelOption).toBeFalsy();

    line.destroy();
  });

  it('default layout, on', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      appendPadding: 10,
      label: {},
    });

    line.render();

    // @ts-ignore
    expect(line.chart.geometries[0].labelOption.cfg).toEqual({
      layout: [
        { type: 'limit-in-plot' },
        { type: 'path-adjust-position' },
        { type: 'point-adjust-position' },
        { type: 'limit-in-plot', cfg: { action: 'hide' } },
      ],
    });

    line.destroy();
  });
});
