import { Bar } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('annotation', () => {
  const bar = new Bar(createDiv(), {
    width: 300,
    height: 400,
    data: salesByArea,
    xField: 'sales',
    yField: 'area',
  });

  bar.render();

  it('text annotation', () => {
    bar.update({
      ...bar.options,
      annotations: [
        {
          type: 'text',
          position: ['median', 'median'],
          content: '辅助文本',
        },
      ],
    });
    expect(bar.chart.getController('annotation').getComponents().length).toBe(1);
    expect(bar.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('辅助文本');
  });

  it('text annotation and line annotation', () => {
    bar.update({
      ...bar.options,
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
    expect(bar.chart.getController('annotation').getComponents().length).toBe(2);
    expect(bar.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('辅助文本');
    expect(bar.chart.getController('annotation').getComponents()[1].component.get('type')).toBe('line');
  });

  afterAll(() => {
    bar.destroy();
  });
});
