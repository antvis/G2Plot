import { DualLine } from '../../../../src';
import { CountryEconomy } from '../../../data/country-economy';
import { createDiv } from '../../../utils/dom';

describe('dualline meta', () => {
  it('hide axis', () => {
    document.body.append('hide axis');
    const dualline = new DualLine(createDiv(), {
      width: 400,
      height: 500,
      data: CountryEconomy,
      xField: 'Country',
      yField: ['GDP', 'Population'],
      xAxis: false,
      yAxis: [false, false],
    });

    dualline.render();

    const axes = dualline.chart.getComponents().filter((co) => co.type === 'axis');
    expect(axes.length).toBe(0);

    // dualline.destroy();
  });

  it('position', () => {
    document.body.append('axis');
    const dualline = new DualLine(createDiv(), {
      width: 400,
      height: 500,
      data: CountryEconomy,
      xField: 'Country',
      yField: ['GDP', 'Population'],
      xAxis: {
        position: 'top',
      },
      yAxis: [
        {
          position: 'right',
        },
        false,
      ],
    });

    dualline.render();

    const axes = dualline.chart.getComponents().filter((co) => co.type === 'axis');
    expect(axes.length).toBe(2);
    expect(axes[0].direction).toBe('top');
    expect(axes[1].direction).toBe('right');

    // dualline.destroy();
  });

  it('axis style', () => {
    document.body.append('axis');
    const dualline = new DualLine(createDiv(), {
      width: 400,
      height: 500,
      data: CountryEconomy,
      xField: 'Country',
      yField: ['GDP', 'Population'],
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

    dualline.render();

    const axes = dualline.chart.getComponents().filter((co) => co.type === 'axis');
    expect(axes.length).toBe(3);
    // position
    expect(axes[0].direction).toBe('bottom');
    expect(axes[1].direction).toBe('left');
    expect(axes[2].direction).toBe('right');
    // line
  });
});
