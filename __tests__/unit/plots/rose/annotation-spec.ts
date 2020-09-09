import { Rose } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('annotation', () => {
  const rose = new Rose(createDiv(), {
    width: 300,
    height: 400,
    data: salesByArea,
    xField: 'sales',
    yField: 'area',
    innerRadius: 0.64,
  });

  rose.render();

  it('text annotation', () => {
    rose.update({
      ...rose.options,
      annotations: [
        {
          type: 'text',
          position: ['50%', '50%'],
          content: '辅助文本',
        },
      ],
    });
    expect(rose.chart.getController('annotation').getComponents().length).toBe(1);
    expect(rose.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('辅助文本');
  });

  it('text annotation and image annotation', () => {
    rose.update({
      ...rose.options,
      annotations: [
        {
          type: 'text',
          position: ['50%', '50%'],
          content: '辅助文本',
        },
        {
          type: 'image',
          position: ['50%', '50%'],
          src: 'https://gw.alipayobjects.com/zos/antfincdn/SlbIagEvT7/G2plot.svg',
        },
      ],
    });
    expect(rose.chart.getController('annotation').getComponents().length).toBe(2);
    expect(rose.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('辅助文本');
    expect(rose.chart.getController('annotation').getComponents()[1].component.get('type')).toBe('image');
    expect(rose.chart.getController('annotation').getComponents()[1].component.get('src')).toBe(
      'https://gw.alipayobjects.com/zos/antfincdn/SlbIagEvT7/G2plot.svg'
    );
  });

  afterAll(() => {
    rose.destroy();
  });
});
