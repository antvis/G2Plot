import { MultiView } from '../../../../src/plots/multi-view';
import { createDiv } from '../../../utils/dom';

describe('multi-view tooltip', () => {
  const plot = new MultiView(createDiv(), {
    tooltip: { showMarkers: false },
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

  it('setting tooltip to sub-views works', () => {
    // @ts-ignore
    expect(plot.chart.getController('tooltip').visible).toBe(true);
    // @ts-ignore
    expect(plot.chart.getController('tooltip').getTooltipCfg().showMarkers).toBe(false);

    plot.update({
      tooltip: false,
      views: [
        {
          data: [
            { x: 'x', y: 1 },
            { x: 'x1', y: 20 },
          ],
          tooltip: { showCrosshairs: false },
          geometries: [{ type: 'area', xField: 'x', yField: 'y', mapping: {} }],
        },
      ],
    });

    expect(plot.chart.views.length).toBe(3);
    // @ts-ignore
    expect(plot.chart.getController('tooltip').isVisible()).toBe(false);
    // @ts-ignore
    expect(plot.chart.views[0].getController('tooltip').getTooltipCfg().showCrosshairs).toBe(false);
  });

  afterAll(() => {
    plot.destroy();
  });
});
