import { Area } from '../../../../src';
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
  const plot = new Area(createDiv(), {
    data: DATA,
    xField: 'type',
    yField: 'value',
  });

  it('limitInPlot false', () => {
    plot.render();
    expect(plot.chart.limitInPlot).toBeFalsy();
  });

  it('limitInPlot true', () => {
    plot.update({
      yAxis: {
        minLimit: 6,
      },
    });
    plot.render();
    expect(plot.chart.limitInPlot).toBeTruthy();
  });

  it('limitInPlot false', () => {
    plot.update({
      yAxis: {
        minLimit: undefined,
      },
    });
    plot.render();
    expect(plot.chart.limitInPlot).toBeFalsy();
  });

  it('user config', () => {
    plot.update({
      yAxis: {
        minLimit: 6,
      },
      limitInPlot: false,
    });
    plot.render();
    expect(plot.chart.limitInPlot).toBeFalsy();

    plot.update({
      yAxis: false,
      limitInPlot: true,
    });
    plot.render();
    expect(plot.chart.limitInPlot).toBeTruthy();
  });
});
