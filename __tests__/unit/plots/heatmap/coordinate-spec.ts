import { Heatmap } from '../../../../src';
import { semanticBasicHeatmapData } from '../../../data/basic-heatmap';
import { createDiv } from '../../../utils/dom';

describe('heatmap', () => {
  it('x*y*color and default coordinate', () => {
    const heatmap = new Heatmap(createDiv('default axis'), {
      width: 400,
      height: 300,
      data: semanticBasicHeatmapData,
      xField: 'name',
      yField: 'day',
      colorField: 'sales',
      shape: 'circle',
      coordinate: {
        type: 'rect',
      },
    });

    heatmap.render();

    // @ts-ignore
    expect(heatmap.chart.options.coordinate.type).toBe('rect');

    heatmap.destroy();
  });

  it('x*y*color and custom axis', () => {
    const heatmap = new Heatmap(createDiv('custom axis'), {
      width: 400,
      height: 300,
      data: semanticBasicHeatmapData,
      xField: 'name',
      yField: 'day',
      colorField: 'sales',
      shape: 'circle',
      coordinate: {
        type: 'polar',
        cfg: {
          radius: 0.85,
          innerRadius: 0.2,
        },
        actions: [['rotate', 2]],
      },
    });

    heatmap.render();

    // @ts-ignore
    expect(heatmap.chart.options.coordinate.type).toBe('polar');
    // @ts-ignore
    expect(heatmap.chart.options.coordinate.cfg.radius).toBe(0.85);
    // @ts-ignore
    expect(heatmap.chart.options.coordinate.cfg.innerRadius).toBe(0.2);

    heatmap.update({
      ...heatmap.options,
      coordinate: {
        type: 'rect',
        actions: [['transpose']],
      },
    });

    // @ts-ignore
    expect(heatmap.chart.options.coordinate.actions[0][0]).toBe('transpose');
    // @ts-ignore
    expect(heatmap.chart.options.coordinate.type).toBe('rect');

    heatmap.destroy();
  });
});
