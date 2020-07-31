import { Biax } from '../../../../src';
import { PV_DATA, UV_DATA } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';

describe('Biax meta', () => {
  it('hide axis', () => {
    document.body.append('hide axis');
    const biax = new Biax(createDiv(), {
      width: 400,
      height: 500,
      data: [PV_DATA, UV_DATA],
      xField: 'date',
      yField: ['pv', 'uv'],
      xAxis: false,
      yAxis: [false, false],
    });

    biax.render();

    const leftAxes = biax.chart.getComponents().filter((co) => co.type === 'axis');
    const rightAxes = biax.chart.views[0].getComponents().filter((co) => co.type === 'axis');
    expect(leftAxes.length + rightAxes.length).toBe(0);

    // Biax.destroy();
  });

  it('axis style', () => {
    document.body.append('axis');
    const biax = new Biax(createDiv(), {
      width: 400,
      height: 500,
      data: [PV_DATA, UV_DATA],
      xField: 'date',
      yField: ['pv', 'uv'],
      xAxis: {
        position: 'bottom',
        title: {
          offset: 10,
          style: {
            color: '#333',
            autoRotate: true,
          },
        },
      },
      yAxis: [
        {
          position: 'left',
          line: {
            style: {
              lineWidth: 2,
            },
          },
          tickLine: {
            style: {
              lineWidth: 2,
            },
            alignTick: true,
          },
          subTickLine: {
            style: {
              lineWidth: 1,
              count: 4,
            },
          },
        },
        {
          position: 'right',
          line: {
            style: {
              lineWidth: 2,
            },
          },
          tickLine: {
            style: {
              lineWidth: 2,
            },
            alignTick: true,
          },
          subTickLine: {
            style: {
              lineWidth: 1,
              count: 4,
            },
          },
        },
      ],
    });

    biax.render();

    // TODO 补充用例
  });
});
