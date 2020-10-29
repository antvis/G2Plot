import { RadialBar } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('radial-bar axis', () => {
  const data = [
    { question: '问题 1', percent: 0.21 },
    { question: '问题 2', percent: 0.4 },
    { question: '问题 3', percent: 0.49 },
    { question: '问题 4', percent: 0.52 },
    { question: '问题 5', percent: 1.2 },
    { question: '问题 6', percent: 0.84 },
    { question: '问题 7', percent: 1.0 },
    { question: '问题 8', percent: 1.2 },
  ];
  it('xAxis*yAxis', () => {
    const bar = new RadialBar(createDiv(), {
      width: 400,
      height: 300,
      data,
      xField: 'question',
      yField: 'percent',
      xAxis: {
        line: {
          style: {
            lineWidth: 1,
            fill: 'red',
          },
        },
      },
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
    expect(axisOptions['percent']).toBeUndefined();
    expect(axisOptions['question']).toMatchObject({
      grid: null,
      line: null,
      tickLine: null,
    });
  });
});
