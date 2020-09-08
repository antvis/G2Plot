import { Area } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('annotation', () => {
  const area = new Area(createDiv(), {
    width: 400,
    height: 300,
    appendPadding: 10,
    data: partySupport.filter((o) => o.type === 'FF'),
    xField: 'date',
    yField: 'value',
  });
  area.render();

  it('text annotation', () => {
    area.update({
      ...area.options,
      annotations: [
        {
          type: 'text',
          position: ['median', 'median'],
          content: '面积图',
        },
      ],
    });
    expect(area.chart.getController('annotation').getComponents().length).toBe(1);
    expect(area.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('面积图');
  });

  it('text annotation and line annotation', () => {
    area.update({
      ...area.options,
      annotations: [
        {
          type: 'text',
          position: ['median', 'median'],
          content: '面积图',
        },
        {
          type: 'line',
          start: ['min', 'median'],
          end: ['max', 'median'],
        },
      ],
    });
    expect(area.chart.getController('annotation').getComponents().length).toBe(2);
    expect(area.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('面积图');
    expect(area.chart.getController('annotation').getComponents()[1].component.get('type')).toBe('line');
  });

  afterAll(() => {
    area.destroy();
  });
});
