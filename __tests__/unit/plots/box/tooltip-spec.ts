import { Box } from '../../../../src';
import { boxData, groupBoxData } from '../../../data/box';
import { createDiv, removeDom } from '../../../utils/dom';

describe('box tooltip', () => {
  const div = createDiv('');
  const box = new Box(div, {
    width: 400,
    height: 500,
    data: boxData,
    xField: 'x',
    yField: ['low', 'q1', 'median', 'q3', 'high'],
    tooltip: {
      title: 'hello world',
    },
  });

  box.render();

  it('tooltip: custom title', () => {
    // @ts-ignore
    expect(box.chart.options.tooltip.title).toBe('hello world');
    const bbox = box.chart.geometries[0].elements[0].getBBox();

    box.chart.showTooltip({ x: bbox.width / 2 + bbox.x, y: bbox.height / 2 + bbox.y });
    expect(div.querySelectorAll('.g2-tooltip-list-item').length).toBe(5);
    box.chart.hideTooltip();
  });

  it('tooltip: fields', () => {
    box.update({ tooltip: { fields: ['low', 'q1', 'median'] } });
    const bbox = box.chart.geometries[0].elements[0].getBBox();

    box.chart.showTooltip({ x: bbox.width / 2 + bbox.x, y: bbox.height / 2 + bbox.y });
    expect(div.querySelectorAll('.g2-tooltip-list-item').length).toBe(3);
    box.chart.hideTooltip();
  });

  it('tooltip: fields & customContent', () => {
    box.update({
      tooltip: {
        fields: ['low', 'q1', 'median'],
        customContent: (text, items) =>
          `<div>${items.map((item, idx) => `<div class="custom-tooltip-item-content">${idx}</div>`)}<div>`,
      },
    });

    const bbox = box.chart.geometries[0].elements[0].getBBox();
    box.chart.showTooltip({ x: bbox.width / 2 + bbox.x, y: bbox.height / 2 + bbox.y });
    expect(div.getElementsByClassName('custom-tooltip-item-content').length).toBe(3);

    // 设置hide
    box.chart.hideTooltip();
  });

  it('tooltip: groupField', () => {
    box.update({
      data: groupBoxData,
      xField: 'type',
      yField: '_bin',
      groupField: 'Species',
      tooltip: { fields: undefined, customContent: undefined },
    });
    // @ts-ignore
    expect(box.chart.options.tooltip.shared).toBe(true);
    // @ts-ignore 箱线图 默认不展示 crosshairs（ugly）
    expect(box.chart.options.tooltip.showCrosshairs).toBeUndefined();

    const bbox = box.chart.geometries[0].elements[0].getBBox();
    box.chart.showTooltip({ x: bbox.width / 2 + bbox.x, y: bbox.height / 2 + bbox.y });

    expect(div.querySelectorAll('.g2-tooltip-list-item').length).toBe(3);
    expect((div.querySelector('.g2-tooltip-name') as HTMLElement).innerText).toBe('I. setosa');
    box.chart.hideTooltip();
  });

  it('tooltip: false', () => {
    box.update({ tooltip: false });
    // @ts-ignore
    expect(box.chart.options.tooltip).toBe(false);
    expect(box.chart.getComponents().find((co) => co.type === 'tooltip')).toBe(undefined);
  });

  afterAll(() => {
    box.destroy();
    removeDom(div);
  });
});
