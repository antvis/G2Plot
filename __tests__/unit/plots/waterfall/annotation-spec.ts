import { Waterfall } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('annotation', () => {
  const waterfall = new Waterfall(createDiv(), {
    width: 300,
    height: 400,
    data: salesByArea,
    xField: 'sales',
    yField: 'area',
  });

  waterfall.render();

  it('text annotation', () => {
    waterfall.update({
      ...waterfall.options,
      annotations: [
        {
          type: 'text',
          position: ['median', 'median'],
          content: '辅助文本',
        },
      ],
    });
    expect(waterfall.chart.getController('annotation').getComponents().length).toBe(1);
    expect(waterfall.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('辅助文本');
  });

  it('text annotation and line annotation', () => {
    waterfall.update({
      ...waterfall.options,
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
    expect(waterfall.chart.getController('annotation').getComponents().length).toBe(2);
    expect(waterfall.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('辅助文本');
    expect(waterfall.chart.getController('annotation').getComponents()[1].component.get('type')).toBe('line');
  });

  afterAll(() => {
    waterfall.destroy();
  });
});
