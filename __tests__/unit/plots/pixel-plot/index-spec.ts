import { PixelPlot } from '../../../../src/pixels';
import { createDiv } from '../../../utils/dom';
import { PIXEL_DATA } from '../../../data/pixels';
import { LARGE_DATA } from '../../../data/large-data';
import { getContainerSize } from '../../../../src/utils';

describe('pixel-plot', () => {
  const div = createDiv();
  const width = 1000,
    height = 500,
    padding = [40, 50, 30, 50];

  it('default padding', () => {
    const plot = new PixelPlot(div, {
      width,
      height,
      padding,
      rawData: LARGE_DATA,
      pixelData: PIXEL_DATA,
      xField: 'date',
      yField: 'high',
      seriesField: 'name',
    });

    plot.render();
    // 三个画布都存在
    expect(plot.type).toBe('canvas-plot');
    const bgCanvas = document.getElementById('bg-canvas');
    const midCanvas = document.getElementById('mid-canvas');
    const fgCanvas = document.getElementById('fg-canvas');
    expect(bgCanvas.style.width).toEqual('1000px');
    expect(fgCanvas.style.width).toEqual('1000px');
    expect(midCanvas.getAttribute('width')).toEqual('1000');

    // 轴存在，有默认类型
    const xAxis = plot.axisController.xAxisComponent;
    const yAxis = plot.axisController.yAxisComponent;
    expect(xAxis.cfg.visible).toBe(true);
    expect(yAxis.cfg.visible).toBe(true);
    expect(xAxis.cfg.type).toBe('line');
    expect(yAxis.cfg.type).toBe('line');

    // 轴存在，具有默认比例尺
    expect(plot.scales.get('date').scale.type).toBe('time');
    expect(plot.scales.get('high').scale.type).toBe('linear');
    expect(plot.scales.get('date').scaleOption.nice).toBe(true);
    expect(plot.scales.get('high').scaleOption.nice).toBe(true);

    const bbox = { x: 50, y: 40, width: width - padding[1] - padding[3], height: height - padding[0] - padding[2] };
    expect(plot.pixelBBox).toEqual(bbox);

    plot.destroy();
  });

  it('autoFit', () => {
    div.style.width = '500px';
    div.style.height = '400px';

    const plot = new PixelPlot(div, {
      // width,
      // height,
      padding,
      autoFit: true,
      rawData: LARGE_DATA,
      pixelData: PIXEL_DATA,
      xField: 'date',
      yField: 'high',
      seriesField: 'name',
    });

    plot.render();

    const { width, height } = getContainerSize(div);
    const bbox = { x: 50, y: 40, width: width - padding[1] - padding[3], height: height - padding[0] - padding[2] };
    expect(plot.pixelBBox).toEqual(bbox);

    plot.destroy();
  });
});
