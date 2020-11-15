import { Stock } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { kdata } from '../../../data/stock';

import { DEFAULT_TOOLTIP_OPTIONS } from '../../../../src/plots/stock/constant';
import { pick } from '../../../../src/utils';

describe('Stock tooltip', () => {
  it('tooltip: default options', () => {
    const k = new Stock(createDiv('default tooltip'), {
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

    k.destroy();
  });

  it('tooltip: options', () => {
    const k = new Stock(createDiv('tooltip: options'), {
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

    k.destroy();
  });

  it('tooltip: custom itemTpl', () => {
    const k = new Stock(createDiv('custom itemTpl'), {
      width: 400,
      height: 500,
      data: kdata,
      xField: 'date',
      yField: ['start', 'end', 'max', 'min'],
      tooltip: {
        itemTpl:
          '<li class="g2-tooltip-list-item custom-item-tpl" data-index={index} style="margin-bottom:4px;">' +
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

    // 渲染自定义itemTpl
    k.chart.showTooltip({ x: bbox.maxX, y: bbox.maxY });
    expect(document.getElementsByClassName('custom-item-tpl')[0].innerHTML).not.toBeNull();

    k.destroy();
  });

  it('tooltip:  change the configuration && operation', () => {
    const k = new Stock(createDiv('change the configuration && operation'), {
      width: 400,
      height: 500,
      data: kdata,
      xField: 'date',
      yField: ['start', 'end', 'max', 'min'],
    });

    k.render();

    const geometry = k.chart.geometries[0];
    const elements = geometry.elements;
    const bbox = elements[elements.length - 1].getBBox();

    // 正常渲染某个元素tooltip
    k.chart.showTooltip({ x: bbox.maxX, y: bbox.maxY });
    expect(document.getElementsByClassName('itemTpl')[0].innerHTML).not.toBeNull();

    // 设置hide
    k.update({
      ...k.options,
      tooltip: false,
    });
    // @ts-ignore
    expect(k.chart.options.tooltip).toBe(false);
    expect(k.chart.getComponents().find((co) => co.type === 'tooltip')).toBe(undefined);

    k.destroy();

  });
});
