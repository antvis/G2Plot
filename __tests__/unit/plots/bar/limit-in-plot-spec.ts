import { Bar } from '../../../../src';
import { createDiv } from '../../../utils/dom';

const DATA = [
  {
    type: 'A',
    value: 0,
  },
  {
    type: 'B',
    value: 10,
  },
  {
    type: 'C',
    value: 5,
  },
  {
    type: 'D',
    value: 20,
  },
];

describe('line limitInPlot', () => {
  const plot = new Bar(createDiv(), {
    data: DATA,
    yField: 'type',
    xField: 'value',
  });

  it('limitInPlot false', () => {
    plot.render();
    expect(plot.chart.limitInPlot).toBeFalsy();
  });

  it('limitInPlot true', () => {
    plot.update({
      xAxis: {
        minLimit: 6,
      },
    });
    plot.render();
    expect(plot.chart.limitInPlot).toBeTruthy();
  });

  it('limitInPlot false', () => {
    plot.update({
      xAxis: {
        minLimit: undefined,
      },
    });
    plot.render();
    expect(plot.chart.limitInPlot).toBeFalsy();
  });
});
