import { RadialBar } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { Datum } from '../../../../src/types';

describe('radial-bar tooltip', () => {
  const data = [
    { question: '问题 1', percent: 0.21 },
    { question: '问题 2', percent: 0.4 },
    { question: '问题 3', percent: 0.49 },
    { question: '问题 4', percent: 0.52 },
    { question: '问题 5', percent: 0.53 },
    { question: '问题 6', percent: 0.84 },
    { question: '问题 7', percent: 1.0 },
    { question: '问题 8', percent: 1.2 },
  ];
  const formatter = (datum: Datum) => {
    return { name: '占比', value: datum.percent * 100 + '%' };
  };
  it('tooltip default', () => {
    const bar = new RadialBar(createDiv(), {
      width: 400,
      height: 300,
      data,
      xField: 'question',
      yField: 'percent',
      tooltip: {
        formatter,
      },
    });
    bar.render();
    // @ts-ignore
    const tooltip = bar.chart.options.tooltip;
    // @ts-ignore
    expect(tooltip.showMarkers).toBe(false);
    // @ts-ignore
    expect(tooltip.title).toBe('question');
    // @ts-ignore
    expect(tooltip.formatter).toBe(formatter);
  });
});
