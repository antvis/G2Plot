import { Scatter } from '../../../../src';
import { data } from '../../../data/gender';
import { createDiv } from '../../../utils/dom';

describe('annotation', () => {
  const scatter = new Scatter(createDiv(), {
    width: 300,
    height: 400,
    data,
    xField: 'weight',
    yField: 'height',
    sizeField: 'weight',
    size: [5, 10],
    quadrant: {
      xBaseline: 80,
      yBaseline: 170,
      labels: [
        {
          content: 'Male decrease,\nfemale increase',
        },
        {
          content: 'Female decrease,\nmale increase',
        },
        {
          content: 'Female & male decrease',
        },
        {
          content: 'Female &\n male increase',
        },
      ],
    },
  });

  scatter.render();

  it('default, quadrannt', () => {
    const components = scatter.chart
      .getController('annotation')
      .getComponents()
      .map((co) => co.component);
    expect(components.length).toBe(4 * 2 + 2 /** axis */);
    expect(components.filter((co) => co.get('type') === 'region').length).toBe(4);
    expect(components.filter((co) => co.get('type') === 'text').length).toBe(4);
    expect(components.filter((co) => co.get('type') === 'line').length).toBe(2);
  });

  it('text annotation', () => {
    scatter.update({
      ...scatter.options,
      annotations: [
        {
          type: 'text',
          position: ['100%', '50%'],
          content: '辅助文本',
        },
      ],
    });
    expect(scatter.chart.getController('annotation').getComponents().length).toBe(11);
    expect(scatter.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('辅助文本');
  });

  it('text annotation and image annotation', () => {
    scatter.update({
      ...scatter.options,
      quadrant: null,
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
    expect(scatter.chart.getController('annotation').getComponents().length).toBe(2);
    expect(scatter.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('辅助文本');
    expect(scatter.chart.getController('annotation').getComponents()[1].component.get('type')).toBe('image');
    expect(scatter.chart.getController('annotation').getComponents()[1].component.get('src')).toBe(
      'https://gw.alipayobjects.com/zos/antfincdn/SlbIagEvT7/G2plot.svg'
    );
  });

  afterAll(() => {
    scatter.destroy();
  });
});
