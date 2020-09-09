import { Column } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('annotation', () => {
  const column = new Column(createDiv(), {
    width: 300,
    height: 400,
    data: salesByArea,
    xField: 'sales',
    yField: 'area',
  });

  column.render();

  it('text annotation', () => {
    column.update({
      ...column.options,
      annotations: [
        {
          type: 'text',
          position: ['median', 'median'],
          content: '辅助文本',
        },
      ],
    });
    expect(column.chart.getController('annotation').getComponents().length).toBe(1);
    expect(column.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('辅助文本');
  });

  it('text annotation and line annotation', () => {
    column.update({
      ...column.options,
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
    expect(column.chart.getController('annotation').getComponents().length).toBe(2);
    expect(column.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('辅助文本');
    expect(column.chart.getController('annotation').getComponents()[1].component.get('type')).toBe('line');
  });

  afterAll(() => {
    column.destroy();
  });
});
