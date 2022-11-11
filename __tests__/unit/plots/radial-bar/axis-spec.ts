import { RadialBar } from '../../../../src';
import { antvStar } from '../../../data/antv-star';
import { createDiv } from '../../../utils/dom';

const xField = 'name';
const yField = 'star';

describe('radial-bar axis', () => {
  it('xAxis*yAxis', () => {
    const bar = new RadialBar(createDiv(), {
      width: 400,
      height: 300,
      data: antvStar,
      xField,
      yField,
      yAxis: {
        line: {
          style: {
            lineWidth: 1,
            fill: 'red',
          },
        },
      },
    });
    bar.render();
    const axisOptions = bar.chart.getOptions().axes;
    expect(axisOptions[yField]).toBeUndefined();
    expect(axisOptions[xField]).toMatchObject({
      grid: null,
      line: null,
      tickLine: null,
    });

    bar.destroy();
  });
});
