import { PixelPlot } from '../../../../src/pixels';
import { createDiv } from '../../../utils/dom';
import { delay } from '../../../utils/delay';
import { PIXEL_DATA } from '../../../data/pixels';
import { LARGE_DATA } from '../../../data/large-data';
import { tooltipInfo } from '../../../../src/pixels/mock/data';

describe('pixel-line tooltip', () => {
  const div = createDiv();
  const width = 1000,
    height = 500,
    padding = [40, 50, 30, 50];

  it('default tooltip', () => {
    // 默认 tooltip 存在
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

    // tooltip 存在
    const tooltip = plot.tooltipController.tooltip;
    const crosshair = plot.tooltipController.crosshair;

    expect(tooltip.get('type')).toBe('html');
    expect(tooltip.get('showTitle')).toBe(true);

    expect(crosshair.get('type')).toBe('line');
    plot.destroy();
  });

  it('tooltip follow: false', () => {
    // 默认 tooltip 存在
    const plot = new PixelPlot(div, {
      width,
      height,
      padding,
      rawData: LARGE_DATA,
      pixelData: PIXEL_DATA,
      xField: 'date',
      yField: 'high',
      seriesField: 'name',
      tooltip: {
        follow: false,
      },
    });

    plot.render();

    // tooltip 不跟随, 且位置左上角固定
    const tooltip = plot.tooltipController.tooltip;
    const bbox = tooltip.getBBox();

    expect(bbox.x).toBe(0);
    expect(bbox.y).toBe(0);

    plot.destroy();
  });

  it('tooltip title fields', async () => {
    // 默认 tooltip 存在
    const plot = new PixelPlot(div, {
      width,
      height,
      padding,
      rawData: LARGE_DATA,
      pixelData: PIXEL_DATA,
      xField: 'date',
      yField: 'high',
      seriesField: 'name',
      tooltip: {
        title: 'stock list',
        fields: ['date', 'high'],
      },
    });

    plot.render();

    // tooltip 不跟随, 且位置左上角固定
    const tooltip = plot.tooltipController.tooltip;
    const bbox = plot.pixelBBox;
    // 触发 show 方法， title才会更新
    plot.tooltipController.show({ x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 });

    await delay(0);

    expect(tooltip.get('title')).toBe('stock list');
    expect(div.querySelectorAll('.g2-tooltip-list-item').length).toBe(6);

    expect((div.querySelector('.g2-tooltip-title') as HTMLElement).innerText).toBe('stock list');
    expect((div.querySelector('.g2-tooltip-name') as HTMLElement).innerText).toBe('date');
    expect((div.querySelector('.g2-tooltip-value') as HTMLElement).innerText).toBe(
      `${plot.tooltipController.getTooltipInfo()[0]['data']['date']}`
    );
    expect((div.querySelectorAll('.g2-tooltip-name')[1] as HTMLElement).innerText).toBe('high');
    expect((div.querySelectorAll('.g2-tooltip-value')[1] as HTMLElement).innerText).toBe(
      `${plot.tooltipController.getTooltipInfo()[0]['data']['high']}`
    );

    plot.tooltipController.hide();

    plot.destroy();
  });

  it('tooltip position', async () => {
    // 默认 tooltip 存在
    const plot = new PixelPlot(div, {
      width,
      height,
      padding,
      rawData: LARGE_DATA,
      pixelData: PIXEL_DATA,
      xField: 'date',
      yField: 'high',
      seriesField: 'name',
      tooltip: {
        position: 'right',
      },
    });

    plot.render();

    const tooltip = plot.tooltipController.tooltip;
    const bbox = plot.pixelBBox;

    plot.tooltipController.show({ x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 });

    await delay(0);
    expect(tooltip.get('position')).toBe('right');

    plot.destroy();
  });
});
