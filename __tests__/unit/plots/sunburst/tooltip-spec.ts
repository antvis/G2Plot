import { Sunburst } from '../../../../src';
import { DEFAULT_OPTIONS, SUNBURST_PATH_FIELD } from '../../../../src/plots/sunburst/constant';
import { SIMPLE_SUNBURST_DATA } from '../../../data/sunburst';
import { createDiv, removeDom } from '../../../utils/dom';

describe('sunburst', () => {
  const div = createDiv();
  const plot = new Sunburst(div, {
    data: SIMPLE_SUNBURST_DATA,
  });
  plot.render();

  it('default', () => {
    const tooltipOptions = plot.chart.getOptions().tooltip;
    expect(tooltipOptions).not.toBe(false);
    expect(tooltipOptions).toMatchObject(DEFAULT_OPTIONS.tooltip);
    // @ts-ignore 默认不展示 markers
    expect(tooltipOptions.showMarkers).toBe(false);
    // @ts-ignore
    expect(plot.chart.getController('tooltip').isVisible()).toBe(true);
  });

  it('meta', () => {
    // 注意数据降序
    plot.update({
      meta: { [SUNBURST_PATH_FIELD]: { formatter: (v) => `路径：${v}` }, value: { formatter: (v) => `${v} 万` } },
    });
    const tooltipController = plot.chart.getController('tooltip');
    const box = plot.chart.geometries[0].elements[0].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

    const items = tooltipController.getTooltipItems(point);
    expect(items.length).toBe(1);
    expect(items[0].name).toBe('中南美洲');

    plot.chart.showTooltip(point);
    expect(div.querySelectorAll('.g2-tooltip-list-item').length).toBe(1);
    expect((div.querySelector('.g2-tooltip-name') as HTMLElement).innerText).toBe(`路径：中南美洲`);
    expect((div.querySelector('.g2-tooltip-name') as HTMLElement).innerText).toBe(`路径：中南美洲`);
    expect((div.querySelector('.g2-tooltip-value') as HTMLElement).innerText).toBe(`6 万`);
    plot.chart.hideTooltip();
  });

  it('tooltip: fields', () => {
    plot.update({ meta: undefined });
    const tooltipController = plot.chart.getController('tooltip');
    const box = plot.chart.geometries[0].elements[0].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

    plot.chart.showTooltip(point);
    expect(div.querySelectorAll('.g2-tooltip-list-item').length).toBe(1);
    plot.chart.hideTooltip();

    plot.update({
      meta: {
        name: { alias: '名称' },
        value: { alias: '数值', formatter: (v) => `${v} %` },
        path: { alias: '路径' },
      },
      tooltip: {
        fields: ['name', 'value', 'path'],
      },
    });

    const items = tooltipController.getTooltipItems(point);
    expect(items.length).toBe(3);
    expect(items[0].name).toBe('名称');
    expect(items[1].name).toBe('数值');
    expect(items[2].name).toBe('路径');

    plot.chart.showTooltip(point);
    expect(div.querySelectorAll('.g2-tooltip-list-item').length).toBe(3);
    expect((div.querySelector('.g2-tooltip-name') as HTMLElement).innerText).toBe('名称');
    expect((div.querySelectorAll('.g2-tooltip-value')[1] as HTMLElement).innerText).toBe(
      `${plot.chart.getData()[0].value} %`
    );
    expect((div.querySelectorAll('.g2-tooltip-value')[2] as HTMLElement).innerText).toBe(plot.chart.getData()[0].path);
    plot.chart.hideTooltip();
  });

  it('tooltip: formatter', () => {
    plot.update({
      tooltip: {
        fields: ['name', 'value', 'path'],
        formatter: () => ({ name: 'xx-name', value: 'xx-value' }),
      },
    });
    const tooltipController = plot.chart.getController('tooltip');
    const box = plot.chart.geometries[0].elements[0].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

    const items = tooltipController.getTooltipItems(point);
    // fixme G2 现在的 bug，只能展示一条
    expect(items.length).toBe(1);
    expect(items[0].name).toBe('xx-name');
    expect(items[0].value).toBe('xx-value');

    plot.chart.showTooltip(point);
    expect(div.querySelectorAll('.g2-tooltip-list-item').length).toBe(1);
    expect((div.querySelector('.g2-tooltip-name') as HTMLElement).innerText).toBe('xx-name');
    expect((div.querySelector('.g2-tooltip-value') as HTMLElement).innerText).toBe('xx-value');
    plot.chart.hideTooltip();
  });

  it('tooltip: customContent', () => {
    plot.update({
      tooltip: {
        fields: ['name', 'value', 'path'],
        formatter: undefined,
        customContent: (title, items) =>
          `<div><span class="custom-tooltip-title">${title}</span>${items.map(
            (item) => `<span class="custom-tooltip-value">${item.value}</span>`
          )}</div>`,
      },
    });
    const box = plot.chart.geometries[0].elements[0].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

    plot.chart.showTooltip(point);
    const chartData = plot.chart.getData();
    expect((div.querySelectorAll('.custom-tooltip-value')[0] as HTMLElement).innerText).toBe(`${chartData[0].name}`);
    expect((div.querySelectorAll('.custom-tooltip-value')[1] as HTMLElement).innerText).toBe(`${chartData[0].value} %`);
    expect((div.querySelectorAll('.custom-tooltip-value')[2] as HTMLElement).innerText).toBe(chartData[0].path);
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
