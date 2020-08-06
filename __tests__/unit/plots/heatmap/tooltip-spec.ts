import { Heatmap } from '../../../../src';
import { semanticBasicHeatmapData } from '../../../data/basic-heatmap';
import { createDiv } from '../../../utils/dom';

describe('heatmap', () => {
  it('x*y*color and tooltip', () => {
    const heatmap = new Heatmap(createDiv('custom tooltip'), {
      width: 400,
      height: 300,
      data: semanticBasicHeatmapData,
      xField: 'name',
      yField: 'day',
      colorField: 'sales',
      label: {
        offset: -2,
        style: {
          fill: '#fff',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
      },
      tooltip: {
        title: 'hello world',
      },
    });

    heatmap.render();

    // @ts-ignore
    expect(heatmap.chart.options.tooltip.title).toBe('hello world');
  });

  it('x*y*color and no tooltip', () => {
    const heatmap = new Heatmap(createDiv('tooltip false'), {
      width: 400,
      height: 300,
      data: semanticBasicHeatmapData,
      xField: 'name',
      yField: 'day',
      colorField: 'sales',
      label: {
        offset: -2,
        style: {
          fill: '#fff',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
      },
      tooltip: false,
    });

    heatmap.render();

    // @ts-ignore
    expect(heatmap.chart.options.tooltip).toBe(false);
    expect(heatmap.chart.getComponents().find((co) => co.type === 'tooltip')).toBe(undefined);
  });
});
