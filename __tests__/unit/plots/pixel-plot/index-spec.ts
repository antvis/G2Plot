import { PixelPlot } from '../../../../src/pixels';
import { createDiv } from '../../../utils/dom';
import { PIXEL_DATA } from '../../../data/pixels';

describe('pixel-plot', () => {
  const div = createDiv();
  const width = 1000,
    height = 500,
    padding = [40, 50, 30, 50];

  it('default', () => {
    const plot = new PixelPlot(div, {
      width,
      height,
      data: PIXEL_DATA,
    });

    plot.render();
    // 三个画布都存在
    expect(plot.type).toBe('canvas-plot');
    const bgCanvas = document.getElementById('bg-canvas');
    const midCanvas = document.getElementById('mid-canvas');
    const foreCanvas = document.getElementById('fore-canvas');
    expect(bgCanvas.style.width).toEqual('1000px');
    expect(foreCanvas.style.width).toEqual('1000px');
    expect(midCanvas.getAttribute('width')).toEqual('1000');

    plot.destroy();
  });

  it('default padding', () => {
    const plot = new PixelPlot(div, {
      width,
      height,
      data: PIXEL_DATA,
      padding,
    });

    plot.render();
    // mid canvas 的位置平移， 更新画布宽高
    const midCanvas = document.getElementById('mid-canvas');
    expect(midCanvas.style.top).toEqual('40px');
    expect(midCanvas.style.left).toEqual('50px');
    expect(midCanvas.getAttribute('width')).toEqual(`${width - padding[1] - padding[3]}`);
    expect(midCanvas.getAttribute('height')).toEqual(`${height - padding[0] - padding[2]}`);
  });
});
