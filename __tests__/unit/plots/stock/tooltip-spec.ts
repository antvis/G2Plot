import { Stock } from '../../../../src';
import { kdata } from '../../../data/stock';
import { createDiv, removeDom } from '../../../utils/dom';

describe('Stock tooltip', () => {
  const div = createDiv('default tooltip');
  const k = new Stock(div, {
    width: 400,
    height: 500,
    data: kdata,
    xField: 'date',
    yField: ['start', 'end', 'max', 'min'],
  });

  k.render();
  it('tooltip: default options', () => {
    // @ts-ignore
    expect(k.chart.options.tooltip.shared).toBe(true);
    // @ts-ignore
    expect(k.chart.options.tooltip.showCrosshairs).toBe(true);
    // @ts-ignore
    expect(k.chart.options.tooltip.showMarkers).toBe(false);
  });

  it('tooltip: default show fields of yField', () => {
    const geometry = k.chart.geometries[0];
    const elements = geometry.elements;
    const bbox = elements[0].getBBox();

    // 正常渲染某个元素tooltip
    k.chart.showTooltip({ x: bbox.minX + bbox.width / 2, y: bbox.y + bbox.height / 2 });

    expect(div.querySelectorAll('.g2-tooltip-list-item').length).toBe(k.options.yField.length);

    // 设置hide
    k.chart.hideTooltip();
  });

  it('tooltip: showTitle', () => {
    k.update({
      tooltip: {
        showTitle: true,
        title: 'hello world',
      },
    });

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

  it('tooltip: custom itemTpl', () => {
    k.update({
      tooltip: {
        itemTpl:
          '<li class="g2-tooltip-list-item custom-item-tpl" data-index={index} style="margin-bottom:4px;">' +
          '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
          '<span class="itemTpl">{name}: </span>' +
          '{value}' +
          '</li>',
      },
    });

    const geometry = k.chart.geometries[0];
    const elements = geometry.elements;
    const bbox = elements[elements.length - 1].getBBox();

    // 渲染自定义itemTpl
    k.chart.showTooltip({ x: bbox.minX + bbox.width / 2, y: bbox.y + bbox.height / 2 });
    expect(document.getElementsByClassName('custom-item-tpl')[0].innerHTML).not.toBeNull();

    // 设置hide
    k.chart.hideTooltip();
  });

  it('tooltip: fields', () => {
    k.update({
      tooltip: {
        fields: ['start', 'end', 'max', 'min', 'volumn'],
      },
    });

    const geometry = k.chart.geometries[0];
    const elements = geometry.elements;
    const bbox = elements[0].getBBox();

    // 正常渲染某个元素tooltip
    k.chart.showTooltip({ x: bbox.minX + bbox.width / 2, y: bbox.y + bbox.height / 2 });

    expect(div.querySelectorAll('.g2-tooltip-list-item').length).toBe(5);

    // 设置hide
    k.chart.hideTooltip();
  });

  // fixme https://github.com/antvis/G2/issues/3435
  it.skip('tooltip: fields & formatter', () => {
    k.update({
      tooltip: {
        fields: ['start', 'end', 'max', 'min', 'volumn'],
        formatter: () => ({ name: 'x', value: 'a' }),
      },
    });

    const geometry = k.chart.geometries[0];
    const elements = geometry.elements;
    const bbox = elements[elements.length - 1].getBBox();

    // 正常渲染某个元素tooltip
    k.chart.showTooltip({ x: bbox.minX + bbox.width / 2, y: bbox.y + bbox.height / 2 });
    expect(div.getElementsByClassName('g2-tooltip-list-item').length).toBe(5);

    // 设置hide
    k.chart.hideTooltip();
  });

  it('tooltip: fields & customContent', () => {
    k.update({
      tooltip: {
        fields: ['start', 'end', 'max'],
        customContent: (text, items) =>
          `<div>${items.map((item, idx) => `<div class="custom-tooltip-item-content">${idx}</div>`)}<div>`,
      },
    });

    const elements = k.chart.geometries[0].elements;
    const bbox = elements[elements.length - 1].getBBox();

    // 正常渲染某个元素tooltip
    k.chart.showTooltip({ x: bbox.minX + bbox.width / 2, y: bbox.y + bbox.height / 2 });
    expect(div.getElementsByClassName('custom-tooltip-item-content').length).toBe(3);

    // 设置hide
    k.chart.hideTooltip();
  });

  it('tooltip: custom crosshairs', () => {
    k.update({
      tooltip: {
        crosshairs: {
          type: 'xy',
          follow: true,
          text: () => {
            return {
              content: 'custom text',
            };
          },
        },
      },
    });

    // @ts-ignore
    expect(k.chart.options.tooltip.crosshairs.text()).not.toBeUndefined();
    // @ts-ignore
    expect(k.chart.options.tooltip.crosshairs.text().content).toBe('custom text');
  });

  afterAll(() => {
    k.destroy();
    removeDom(div);
  });
});
