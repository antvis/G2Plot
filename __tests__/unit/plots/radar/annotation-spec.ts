import { Radar } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('annotation', () => {
  const radar = new Radar(createDiv(), {
    width: 300,
    height: 400,
    data: salesByArea,
    xField: 'sales',
    yField: 'area',
  });

  radar.render();

  it('text annotation', () => {
    radar.update({
      ...radar.options,
      annotations: [
        {
          type: 'text',
          position: ['50%', '50%'],
          content: '辅助文本',
        },
      ],
    });
    expect(radar.chart.getController('annotation').getComponents().length).toBe(1);
    expect(radar.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('辅助文本');
  });

  it('text annotation and image annotation', () => {
    radar.update({
      ...radar.options,
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
    expect(radar.chart.getController('annotation').getComponents().length).toBe(2);
    expect(radar.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('辅助文本');
    expect(radar.chart.getController('annotation').getComponents()[1].component.get('type')).toBe('image');
  });

  afterAll(() => {
    radar.destroy();
  });
});
