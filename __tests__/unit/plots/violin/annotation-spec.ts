import { Violin } from '../../../../src';
import { BASE_VIOLIN_DATA } from '../../../data/violin';
import { createDiv } from '../../../utils/dom';

describe('violin legend', () => {
  const violin = new Violin(createDiv(), {
    width: 400,
    height: 500,
    data: BASE_VIOLIN_DATA,
    xField: 'type',
    yField: 'value',
  });

  violin.render();

  it('text annotation', () => {
    violin.update({
      annotations: [
        {
          type: 'text',
          position: ['median', 'median'],
          content: '辅助文本',
        },
      ],
    });

    const controller = violin.chart.views[0].getController('annotation');
    expect(controller.getComponents().length).toBe(1);
    expect(controller.getComponents()[0].component.get('content')).toBe('辅助文本');
  });

  it('text annotation and line annotation', () => {
    violin.update({
      ...violin.options,
      annotations: [
        {
          type: 'text',
          position: ['min', 'median'],
          content: '辅助文本',
          offsetY: -4,
          style: {
            textBaseviolin: 'bottom',
          },
        },
        {
          type: 'line',
          start: ['min', 'median'],
          end: ['max', 'median'],
          style: {
            stroke: 'red',
            violinDash: [2, 2],
          },
        },
      ],
    });
    const controller = violin.chart.views[0].getController('annotation');
    expect(controller.getComponents().length).toBe(2);
    expect(controller.getComponents()[0].component.get('content')).toBe('辅助文本');
    expect(controller.getComponents()[1].component.get('type')).toBe('line');
  });

  afterAll(() => {
    violin.destroy();
  });
});
