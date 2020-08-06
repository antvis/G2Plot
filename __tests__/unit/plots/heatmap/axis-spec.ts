import { Heatmap } from '../../../../src';
import { semanticBasicHeatmapData } from '../../../data/basic-heatmap';
import { createDiv } from '../../../utils/dom';

describe('heatmap', () => {
  it('x*y*color and default axis', () => {
    const heatmap = new Heatmap(createDiv('default axis'), {
      width: 400,
      height: 300,
      data: semanticBasicHeatmapData,
      xField: 'name',
      yField: 'day',
      colorField: 'sales',
      shapeType: 'circle',
      label: {
        offset: -2,
        style: {
          fill: '#fff',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
      },
    });

    heatmap.render();

    // @ts-ignore
    expect(heatmap.chart.options.axes.day.grid.alignTick).toBe(false);
    // @ts-ignore
    expect(heatmap.chart.options.axes.name.grid.alignTick).toBe(false);
  });

  it('x*y*color and custom axis', () => {
    const heatmap = new Heatmap(createDiv('custom axis'), {
      width: 400,
      height: 300,
      data: semanticBasicHeatmapData,
      xField: 'name',
      yField: 'day',
      colorField: 'sales',
      shapeType: 'circle',
      label: {
        offset: -2,
        style: {
          fill: '#fff',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
      },
      xAxis: {
        line: {
          style: {
            lineWidth: 2,
            stroke: '#ff0000',
          },
        },
      },
      yAxis: {
        label: {
          style: {
            fill: 'red',
          },
        },
      },
    });

    heatmap.render();

    // @ts-ignore
    expect(heatmap.chart.options.axes.name.line.style.lineWidth).toBe(2);
    // @ts-ignore
    expect(heatmap.chart.options.axes.day.label.style.fill).toBe('red');
  });
});
