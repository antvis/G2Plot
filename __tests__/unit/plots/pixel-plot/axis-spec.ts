import { PixelPlot } from '../../../../src/pixels';
import { createDiv } from '../../../utils/dom';
import { PIXEL_DATA } from '../../../data/pixels';
import { LARGE_DATA } from '../../../data/large-data';

describe('pixel-plot', () => {
  const div = createDiv();
  const width = 1000,
    height = 500,
    padding = [40, 50, 30, 50];

  it('default axis', () => {
    const plot = new PixelPlot(div, {
      width,
      height,
      xField: 'date',
      yField: 'high',
      seriesField: 'name',
      rawData: LARGE_DATA,
      pixelData: PIXEL_DATA,
    });

    plot.render();
    // 轴存在，有默认类型
    const xAxis = plot.axisController.xAxis;
    const yAxis = plot.axisController.yAxis;
    expect(xAxis.cfg.visible).toBe(true);
    expect(yAxis.cfg.visible).toBe(true);
    expect(xAxis.cfg.type).toBe('line');
    expect(yAxis.cfg.type).toBe('line');

    plot.destroy();
  });
});
