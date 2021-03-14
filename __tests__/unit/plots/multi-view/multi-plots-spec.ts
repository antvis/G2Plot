import { MultiView } from '../../../../src/plots/multi-view';
import { createDiv } from '../../../utils/dom';
import { DEFAULT_OPTIONS as pieDft } from '../../../../src/plots/pie/contants';

describe('multi-plots in multi-view', () => {
  const plot = new MultiView(createDiv(), {
    plots: [
      {
        type: 'line',
        options: {
          data: [
            { x: 'x', y: 1 },
            { x: 'x1', y: 20 },
          ],
          xField: 'x',
          yField: 'y',
        },
      },
      {
        type: 'pie',
        options: {
          data: [
            { x: 'x', y: 1 },
            { x: 'x1', y: 20 },
          ],
          angleField: 'y',
          colorField: 'x',
        },
      },
    ],
  });

  plot.render();

  it('normal', () => {
    expect(plot.chart.views.length).toBe(2);
    expect(plot.chart.views[0].geometries[0].getShapes()[0].get('type')).toBe('path');
    expect(plot.chart.views[1].geometries[0].getShapes()[0].get('type')).toBe('path');
    expect(plot.chart.views[0].geometries[0].elements.length).toBe(1);
    expect(plot.chart.views[1].geometries[0].elements.length).toBe(2);
    expect(plot.chart.views[1].getOptions().tooltip).toMatchObject(pieDft.tooltip);
  });

  it('innormal, 带不合法的 plot type', () => {
    plot.update({
      // @ts-ignore `pass illegal type`
      plots: [
        ...plot.options.plots,
        {
          type: 'xxx',
          options: {
            data: [
              { x: 'x', y: 1 },
              { x: 'x1', y: 20 },
            ],
            xField: 'x',
            yField: 'y',
          },
        },
      ],
    });

    expect(plot.chart.views.length).toBe(3);
    expect(plot.chart.views[2].geometries.length).toBe(0);
  });

  it('plots 混合 views', () => {
    plot.update({
      tooltip: { showMarkers: false },
      views: [
        {
          data: [
            { x: 'x', y: 1 },
            { x: 'x1', y: 20 },
          ],
          geometries: [{ type: 'area', xField: 'x', yField: 'y', mapping: {} }],
        },
        {
          data: [],
          geometries: [{ type: 'interval' }],
        },
      ],
    });
    expect(plot.chart.views.length).toBe(5);
    // 先渲染 view，再渲染 plots
    expect(plot.chart.views[0].geometries[0].type).toBe('area');
    expect(plot.chart.views[1].geometries.length).toBe(0);
  });

  afterAll(() => {
    plot.destroy();
  });
});
