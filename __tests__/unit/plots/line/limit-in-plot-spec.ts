import { Line } from '../../../../src';
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
  const plot = new Line(createDiv(), {
    data: DATA,
    xField: 'type',
    yField: 'value',
    point: {
      size: 10,
    },
  });
  // @ts-ignore
  window.__plot__ = plot;

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
});
