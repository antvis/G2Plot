import { PixelPlot } from '../../../../src/pixels';
import { createDiv } from '../../../utils/dom';
import { PIXEL_DATA } from '../../../data/pixels';
import { LARGE_DATA } from '../../../data/large-data';

describe('pixel-plot', () => {
  const div = createDiv();
  const width = 1000,
    height = 500,
    padding = [40, 50, 30, 50];

  it('default', () => {
    const plot = new PixelPlot(div, {
      width,
      height,
      rawData: LARGE_DATA,
      pixelData: PIXEL_DATA,
      xField: 'date',
      yField: 'high',
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

    plot.destroy();
  });

  it('default padding', () => {
    const plot = new PixelPlot(div, {
      width,
      height,
      rawData: LARGE_DATA,
      pixelData: PIXEL_DATA,
      padding,
      xField: 'date',
      yField: 'high',
    });

    plot.render();
    // mid canvas 的位置平移， 更新画布宽高
    const bbox = { x: 50, y: 40, width: width - padding[1] - padding[3], height: height - padding[0] - padding[2] };
    expect(plot.pixelBBox).toEqual(bbox);
  });
});
