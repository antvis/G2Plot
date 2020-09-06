import { Pie } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('annotation', () => {
  const pie = new Pie(createDiv(), {
    width: 300,
    height: 400,
    data: salesByArea,
    colorField: 'sales',
    angleField: 'area',
    innerRadius: 0.64,
  });

  pie.render();

  it('text annotation', () => {
    expect(pie.chart.getController('annotation').getComponents().length).toBe(2);

    pie.update({
      ...pie.options,
      annotations: [
        {
          type: 'text',
          position: ['median', 'median'],
          content: '辅助文本',
        },
      ],
    });
    expect(pie.chart.getController('annotation').getComponents().length).toBe(3);
    expect(pie.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('辅助文本');
    expect(pie.chart.getController('annotation').getComponents()[1].component.get('key')).toBe('statistic');
  });

  it('text annotation and line annotation', () => {
    pie.update({
      ...pie.options,
      statistic: null,
      annotations: [
        {
          type: 'text',
          position: ['median', 'median'],
          content: '辅助文本',
        },
        {
          type: 'line',
          start: ['min', 'median'],
          end: ['max', 'median'],
        },
      ],
    });
    expect(pie.chart.getController('annotation').getComponents().length).toBe(2);
    expect(pie.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('辅助文本');
    expect(pie.chart.getController('annotation').getComponents()[1].component.get('type')).toBe('line');
  });

  afterAll(() => {
    pie.destroy();
  });
});
