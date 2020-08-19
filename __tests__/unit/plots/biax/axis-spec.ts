import { Biax } from '../../../../src';
import { PV_DATA, UV_DATA } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';

describe('Biax meta', () => {
  it('hide axis', () => {
    const biax = new Biax(createDiv(), {
      width: 300,
      height: 400,
      data: [PV_DATA, UV_DATA],
      xField: 'date',
      yField: ['pv', 'uv'],
      xAxis: false,
      yAxis: [false, false],
    });

    biax.render();

    const leftAxes = biax.chart.views[0].getComponents().filter((co) => co.type === 'axis');
    const rightAxes = biax.chart.views[1].getComponents().filter((co) => co.type === 'axis');
    expect(leftAxes.length + rightAxes.length).toBe(0);
    // Biax.destroy();
  });

  it('axis style', () => {
    const biax = new Biax(createDiv(), {
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

    biax.render();
    const leftOptions = biax.chart.views[0].getOptions();
    const rightOptions = biax.chart.views[1].getOptions();

    // @ts-ignore
    const xAxes = leftOptions.axes.date;
    expect(xAxes.label.style.fill).toBe('red');

    // @ts-ignore
    const leftYAxes = leftOptions.axes.pv;
    expect(leftYAxes.tickCount).toBe(5);

    // @ts-ignore
    const rightYAxes = rightOptions.axes.uv;
    expect(rightYAxes.tickCount).toBe(5);
  });
});
