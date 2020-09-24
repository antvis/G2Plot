import { DualAxes } from '../../../../src';
import { PV_DATA, UV_DATA } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';

describe('DualAxes meta', () => {
  it('hide axis', () => {
    const dualAxes = new DualAxes(createDiv(), {
      width: 300,
      height: 400,
      data: [PV_DATA, UV_DATA],
      xField: 'date',
      yField: ['pv', 'uv'],
      xAxis: false,
      yAxis: [false, false],
    });

    dualAxes.render();

    const leftAxes = dualAxes.chart.views[0].getComponents().filter((co) => co.type === 'axis');
    const rightAxes = dualAxes.chart.views[1].getComponents().filter((co) => co.type === 'axis');
    expect(leftAxes.length + rightAxes.length).toBe(0);
    dualAxes.destroy();
  });

  it('axis style', () => {
    const dualAxes = new DualAxes(createDiv(), {
      width: 300,
      height: 400,
      data: [PV_DATA, UV_DATA],
      xField: 'date',
      yField: ['pv', 'uv'],
      // TO FIX PADDING
      padding: [30, 30],
      xAxis: {
        label: {
          style: {
            fill: 'red',
          },
          formatter: (val) => `_${val}_`,
        },
      },
      yAxis: [
        {
          tickCount: 5,
        },
        {
          tickCount: 5,
        },
      ],
    });

    dualAxes.render();
    const leftOptions = dualAxes.chart.views[0].getOptions();
    const rightOptions = dualAxes.chart.views[1].getOptions();

    // @ts-ignore
    const xAxes = leftOptions.axes.date;
    expect(xAxes.label.style.fill).toBe('red');

    // @ts-ignore
    const leftYAxes = leftOptions.axes.pv;
    expect(leftYAxes.tickCount).toBe(5);

    // @ts-ignore
    const rightYAxes = rightOptions.axes.uv;
    expect(rightYAxes.tickCount).toBe(5);
    dualAxes.destroy();
  });
});
