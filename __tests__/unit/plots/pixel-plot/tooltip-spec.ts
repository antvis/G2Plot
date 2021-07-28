import { PixelPlot } from '../../../../src/pixels';
import { createDiv } from '../../../utils/dom';
import { delay } from '../../../utils/delay';
import { PIXEL_DATA } from '../../../data/pixels';
import { LARGE_DATA } from '../../../data/large-data';
import { tooltipInfo } from '../../../../src/pixels/mock/data';

describe('pixel-line tooltip', () => {
  const div = createDiv();
  const defaultOptions = {
    width: 1000,
    height: 500,
    padding: [40, 50, 30, 50],
    rawData: LARGE_DATA,
    pixelData: PIXEL_DATA,
    xField: 'date',
    yField: 'high',
    seriesField: 'name',
  };

  it('default tooltip', () => {
    // 默认 tooltip 存在
    const plot = new PixelPlot(div, {
      ...defaultOptions,
    });

    plot.render();

    // tooltip 存在
    const tooltip = plot.tooltipController.tooltip;
    const crosshair = plot.tooltipController.xCrosshair;

    expect(tooltip.get('type')).toBe('html');
    expect(tooltip.get('showTitle')).toBe(true);

    expect(crosshair.get('type')).toBe('line');
    plot.destroy();
  });

  it('tooltip follow: false', async () => {
    const plot = new PixelPlot(div, {
      ...defaultOptions,
      tooltip: {
        follow: false,
      },
    });

    plot.render();

    // tooltip 不跟随, 且位置左上角固定
    const tooltip = plot.tooltipController.tooltip;

    await delay(0);

    expect(tooltip.get('x')).toBe(0);
    expect(tooltip.get('y')).toBe(0);

    plot.destroy();
  });

  it('tooltip title fields', async () => {
    const plot = new PixelPlot(div, {
      ...defaultOptions,
      tooltip: {
        title: 'stock list',
        fields: ['date', 'high'],
      },
    });

    plot.render();

    // tooltip 不跟随, 且位置左上角固定
    const tooltip = plot.tooltipController.tooltip;
    // 触发 show 方法， title才会更新
    plot.tooltipController.show({ x: 100, y: 100 });

    await delay(10);

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
    const plot = new PixelPlot(div, {
      ...defaultOptions,
      tooltip: {
        position: 'right',
      },
    });

    plot.render();

    const tooltip = plot.tooltipController.tooltip;

    plot.tooltipController.show({ x: 100, y: 100 });

    await delay(0);
    expect(tooltip.get('position')).toBe('right');

    plot.destroy();
  });

  it('tooltip crosshairs', async () => {
    // 默认 tooltip 存在
    const plot = new PixelPlot(div, {
      ...defaultOptions,
      tooltip: {
        showCrosshairs: true,
        crosshairs: {
          type: 'xy',
          line: {
            style: {
              lineWidth: 2,
            },
          },
          textBackground: {
            padding: 10,
            style: {
              fill: '#fff',
              opacity: 1,
            },
          },
          text: (type) => {
            if (type === 'x') {
              return {
                content: 'xxx',
              };
            } else if (type === 'y') {
              return {
                content: 'yyy',
              };
            }
          },
        },
      },
    });

    plot.render();

    plot.tooltipController.show({ x: 100, y: 100 });

    await delay(0);

    const xCrosshair = plot.tooltipController.xCrosshair;
    const yCrosshair = plot.tooltipController.yCrosshair;

    expect(xCrosshair.get('line').style.lineWidth).toBe(2);
    expect(xCrosshair.get('textBackground').padding).toBe(10);
    expect(yCrosshair.get('textBackground').style.fill).toBe('#fff');
    expect(yCrosshair.get('textBackground').style.opacity).toBe(1);

    expect(xCrosshair.get('text').content).toBe('xxx');
    expect(yCrosshair.get('text').content).toBe('yyy');
    plot.destroy();
  });

  it('tooltip marker', async () => {
    // 默认 tooltip 存在
    const plot = new PixelPlot(div, {
      ...defaultOptions,
      tooltip: {
        showMarkers: true,
        marker: {
          fill: 'red',
          stroke: '#eee',
          lineWidth: 10,
        },
      },
    });

    plot.render();

    plot.tooltipController.show({ x: 100, y: 100 });

    await delay(0);

    const tooltipMarkerGroup = plot.tooltipController.tooltipMarkerGroup;

    expect(tooltipMarkerGroup.get('children')[0].get('attrs').fill).toBe('red');
    expect(tooltipMarkerGroup.get('children')[0].get('attrs').stroke).toBe('#eee');
    expect(tooltipMarkerGroup.get('children')[0].get('attrs').lineWidth).toBe(10);

    plot.destroy();
  });

  it('tooltip customContent', async () => {
    const plot = new PixelPlot(div, {
      ...defaultOptions,
      tooltip: {
        customContent: (title, data) => {
          return `<div class="g2-tooltip">${title}</div>`;
        },
      },
    });

    plot.render();

    plot.tooltipController.show({ x: 100, y: 100 });

    await delay(0);

    expect((div.querySelectorAll('.g2-tooltip')[0] as HTMLElement).innerText).toBe(
      `${plot.tooltipController.tooltip.get('title')}`
    );

    plot.destroy();
  });

  it('tooltip formatter', async () => {
    const plot = new PixelPlot(div, {
      ...defaultOptions,
      tooltip: {
        formatter: (datum) => {
          return { name: datum.name, value: datum.value + '万' };
        },
      },
    });

    plot.render();

    plot.tooltipController.show({ x: 100, y: 100 });

    await delay(0);

    expect((div.querySelectorAll('.g2-tooltip-value')[0] as HTMLElement).innerText).toBe(
      `${plot.tooltipController.getTooltipInfo()[0]['data']['high']}万`
    );

    plot.destroy();
  });
});
