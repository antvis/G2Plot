import { Line } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('annotation', () => {
  const line = new Line(createDiv(), {
    width: 300,
    height: 400,
    data: salesByArea,
    xField: 'area',
    yField: 'sales',
  });

  line.render();

  it('text annotation', () => {
    line.update({
      ...line.options,
      annotations: [
        {
          type: 'text',
          position: ['median', 'median'],
          content: '辅助文本',
        },
      ],
    });
    expect(line.chart.getController('annotation').getComponents().length).toBe(1);
    expect(line.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('辅助文本');
  });

  it('text annotation and line annotation', () => {
    line.update({
      ...line.options,
      annotations: [
        {
          type: 'text',
          position: ['min', 'median'],
          content: '辅助文本',
          offsetY: -4,
          style: {
            textBaseline: 'bottom',
          },
        },
        {
          type: 'line',
          start: ['min', 'median'],
          end: ['max', 'median'],
          style: {
            stroke: 'red',
            lineDash: [2, 2],
          },
        },
      ],
    });
    expect(line.chart.getController('annotation').getComponents().length).toBe(2);
    expect(line.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('辅助文本');
    expect(line.chart.getController('annotation').getComponents()[1].component.get('type')).toBe('line');
  });
});
