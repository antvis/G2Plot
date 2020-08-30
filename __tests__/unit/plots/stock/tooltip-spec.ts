import { Candle } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { kdata } from '../../../data/stock';

import { DEFAULT_TOOLTIP_OPTIONS } from '../../../../src/plots/stock/constant';
import { pick } from '../../../../src/utils';

describe('Candle tooltip', () => {
  it('tooltip: default options', () => {
    const k = new Candle(createDiv('default tooltip'), {
      width: 400,
      height: 500,
      data: kdata,
      xField: 'date',
      yField: ['start', 'end', 'max', 'min'],
    });

    k.render();
    // @ts-ignore
    expect(pick(k.chart.options.tooltip, Object.keys(DEFAULT_TOOLTIP_OPTIONS))).toEqual(DEFAULT_TOOLTIP_OPTIONS);
    // @ts-ignore
    expect(k.chart.options.tooltip.shared).toBe(true);
    // @ts-ignore
    expect(k.chart.options.tooltip.showCrosshairs).toBe(true);
    // @ts-ignore
    expect(k.chart.options.tooltip.showTitle).toBe(false);
    // @ts-ignore
    expect(k.chart.options.tooltip.showMarkers).toBe(false);
  });

  it('tooltip: options', () => {
    const k = new Candle(createDiv('Candle tooltip'), {
      width: 400,
      height: 500,
      data: kdata,
      xField: 'date',
      yField: ['start', 'end', 'max', 'min'],
      tooltip: {
        showTitle: true,
        title: 'hello world',
      },
    });

    k.render();

    // @ts-ignore
    expect(k.chart.options.tooltip.showTitle).toBe(true);
    // @ts-ignore
    expect(k.chart.options.tooltip.title).toBe('hello world');

    k.update({
      ...k.options,
      tooltip: false,
    });
    // @ts-ignore
    expect(k.chart.options.tooltip).toBe(false);
    expect(k.chart.getComponents().find((co) => co.type === 'tooltip')).toBe(undefined);
  });

  it('tooltip: itemTpl options', () => {
    const k = new Candle(createDiv('itemTpl options'), {
      width: 400,
      height: 500,
      data: kdata,
      xField: 'date',
      yField: ['start', 'end', 'max', 'min'],
      tooltip: {
        itemTpl:
          '<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;">' +
          '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
          '<span class="itemTpl">{name}: </span>' +
          '{value}' +
          '</li>',
      },
    });

    k.render();

    const geometry = k.chart.geometries[0];
    const elements = geometry.elements;
    const bbox = elements[elements.length - 1].getBBox();

    // 正常渲染
    k.chart.showTooltip({ x: bbox.maxX, y: bbox.maxY });
    expect(document.getElementsByClassName('itemTpl')[0].innerHTML).not.toBeNull();
  });
});
