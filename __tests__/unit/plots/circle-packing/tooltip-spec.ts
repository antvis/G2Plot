import { TooltipCfg } from '@antv/g2/lib/interface';
import { CirclePacking } from '../../../../src';
import { createDiv, removeDom } from '../../../utils/dom';
import { DATA } from '../../../data/circle-packing';
import { DEFAULT_OPTIONS } from '../../../../src/plots/circle-packing/constant';

describe('Circle-Packing', () => {
  const div = createDiv();
  const plot = new CirclePacking(div, {
    autoFit: true,
    padding: 0,
    data: DATA,
    label: false,
  });
  plot.render();

  it('default', () => {
    // 默认有tooltip
    const tooltipOptions = plot.chart.getOptions().tooltip as TooltipCfg;
    expect(tooltipOptions).not.toBe(false);
    expect(tooltipOptions).toMatchObject(DEFAULT_OPTIONS.tooltip);
    // @ts-ignore 默认不展示 markers 和 title
    expect(tooltipOptions.showMarkers).toBe(false);
    expect(tooltipOptions.showTitle).toBe(false);
    // @ts-ignore isVisible
    expect(plot.chart.getController('tooltip').isVisible()).toBe(true);
  });

  it('meta', () => {
    plot.update({
      meta: {
        name: {
          formatter: (v) => `名称：${v}`,
        },
        value: {
          formatter: (v) => `值：${v} `,
        },
      },
    });
    const tooltipController = plot.chart.getController('tooltip');
    const box = plot.chart.geometries[0].elements[2].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

    const items = tooltipController.getTooltipItems(point);
    expect(items.length).toBe(1);
    expect(items[0].name).toBe('名称：Comedy');

    plot.chart.showTooltip(point);
    expect(div.querySelectorAll('.g2-tooltip-list-item').length).toBe(1);
    expect((div.querySelector('.g2-tooltip-name') as HTMLElement).innerText).toBe(`名称：Comedy`);
    expect((div.querySelector('.g2-tooltip-value') as HTMLElement).innerText).toBe(`值：1039358`);
    plot.chart.hideTooltip();
  });

  it('tooltip: fields', () => {
    plot.update({ meta: undefined });
    const tooltipController = plot.chart.getController('tooltip');
    const box = plot.chart.geometries[0].elements[2].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

    plot.chart.showTooltip(point);
    expect(div.querySelectorAll('.g2-tooltip-list-item').length).toBe(1);
    plot.chart.hideTooltip();

    plot.update({
      meta: {
        name: { alias: '名称', formatter: (v) => `🌞 ${v}` },
        value: { alias: '数值' },
        depth: { alias: '深度' },
      },
      tooltip: {
        fields: ['name', 'value', 'depth'],
      },
    });
    const items = tooltipController.getTooltipItems(point);
    expect(items.length).toBe(3);
    expect(items[0].name).toBe('名称');
    expect(items[1].name).toBe('数值');
    expect(items[2].name).toBe('深度');

    plot.chart.showTooltip(point);
    expect(div.querySelectorAll('.g2-tooltip-list-item').length).toBe(3);
    expect((div.querySelector('.g2-tooltip-name') as HTMLElement).innerText).toBe('名称');
    expect((div.querySelectorAll('.g2-tooltip-value')[1] as HTMLElement).innerText).toBe(
      `${plot.chart.getData()[2].value}`
    );
    expect((div.querySelectorAll('.g2-tooltip-value')[2] as HTMLElement).innerText).toBe(
      `${plot.chart.getData()[2].depth}`
    );
    plot.chart.hideTooltip();
  });

  it('tooltip: formatter', () => {
    plot.update({
      tooltip: {
        fields: ['name', 'value', 'path'],
        formatter: () => ({ name: 'name', value: 'value' }),
      },
    });
    const tooltipController = plot.chart.getController('tooltip');
    const box = plot.chart.geometries[0].elements[0].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

    const items = tooltipController.getTooltipItems(point);
    // fixme G2 现在的 bug，只能展示一条
    expect(items.length).toBe(1);
    expect(items[0].name).toBe('name');
    expect(items[0].value).toBe('value');

    plot.chart.showTooltip(point);
    expect(div.querySelectorAll('.g2-tooltip-list-item').length).toBe(1);
    expect((div.querySelector('.g2-tooltip-name') as HTMLElement).innerText).toBe('name');
    expect((div.querySelector('.g2-tooltip-value') as HTMLElement).innerText).toBe('value');
    plot.chart.hideTooltip();
  });

  it('tooltip: customContent', () => {
    plot.update({
      meta: undefined,
      tooltip: {
        fields: ['name', 'value'],
        formatter: undefined,
        customContent: (title, items) =>
          `<div>${items.map((item) => `<span class="custom-tooltip-value">${item.value}</span>`)}</div>`,
      },
    });
    const box = plot.chart.geometries[0].elements[1].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

    plot.chart.showTooltip(point);
    const chartData = plot.chart.getData();
    expect((div.querySelectorAll('.custom-tooltip-value')[0] as HTMLElement).innerText).toBe(`${chartData[1].name}`);
    expect((div.querySelectorAll('.custom-tooltip-value')[1] as HTMLElement).innerText).toBe(`${chartData[1].value}`);
    plot.chart.hideTooltip();
  });

  it('tooltip: hide', () => {
    plot.update({ tooltip: false });
    // @ts-ignore
    expect(plot.chart.options.tooltip).toBe(false);
    // @ts-ignore
    expect(plot.chart.getController('tooltip').isVisible()).toBe(false);
  });

  afterAll(() => {
    plot.destroy();
    removeDom(div);
  });
});
