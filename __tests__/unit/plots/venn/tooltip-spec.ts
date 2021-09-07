import { Venn } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('venn: tooltip', () => {
  const div = createDiv();
  const data = [
    { sets: ['A'], size: 12, label: 'A' },
    { sets: ['B'], size: 12, label: 'B' },
    { sets: ['C'], size: 12, label: 'C' },
    { sets: ['A', 'B'], size: 2, label: 'A&B' },
    { sets: ['A', 'C'], size: 2, label: 'A&C' },
    { sets: ['B', 'C'], size: 2, label: 'B&C' },
  ];
  const plot = new Venn(div, {
    data,
    width: 400,
    height: 500,
    setsField: 'sets',
    sizeField: 'size',
  });
  plot.render();

  it('tooltip: defaultOption', () => {
    const tooltipOptions = plot.chart.getOptions().tooltip;
    // 默认有 tooltip options
    expect(tooltipOptions).not.toBe(false);
    // @ts-ignore
    expect(tooltipOptions.showMarkers).toBe(false);
    // @ts-ignore
    expect(tooltipOptions.showTitle).toBe(false);
    // @ts-ignore
    expect(tooltipOptions.fields).toEqual(['id', 'size']);
  });

  it('tooltip: showTooltip', () => {
    const tooltipController = plot.chart.getController('tooltip');
    const box = plot.chart.geometries[0].elements[2].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

    plot.chart.showTooltip(point);
    expect(div.querySelectorAll('.g2-tooltip-list-item').length).toBe(1);

    const items = tooltipController.getTooltipItems(point);
    expect(items.length).toBe(1);
    expect((div.querySelector('.g2-tooltip-name') as HTMLElement).innerText).toBe('C');
    expect((div.querySelectorAll('.g2-tooltip-value')[0] as HTMLElement).innerText).toBe(
      `${plot.chart.getData()[2].size}`
    );
    plot.chart.hideTooltip();
  });

  it('tooltip: fields and formatter', () => {
    plot.update({
      tooltip: {
        fields: ['sets', 'size'],
        formatter: (datum) => ({ name: `${datum.sets}`, value: `🌞${datum.size}` }),
      },
    });
    const box = plot.chart.geometries[0].elements[2].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    plot.chart.showTooltip(point);
    expect((div.querySelector('.g2-tooltip-name') as HTMLElement).innerText).toBe(`${plot.chart.getData()[2].sets}`);
    expect((div.querySelectorAll('.g2-tooltip-value')[0] as HTMLElement).innerText).toBe(
      `🌞${plot.chart.getData()[2].size}`
    );
    plot.chart.hideTooltip();
  });

  it('tooltip: customContent', () => {
    plot.update({
      tooltip: {
        fields: ['id', 'size'],
        formatter: undefined,
        customContent: (title, items) =>
          `<div>${items.map((item) => `<span class="custom-tooltip-value">${item.value}</span>`)}</div>`,
      },
    });
    const box = plot.chart.geometries[0].elements[2].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    plot.chart.showTooltip(point);

    expect((div.querySelectorAll('.custom-tooltip-value')[0] as HTMLElement).innerText).toBe(
      `${plot.chart.getData()[2].id}`
    );
    expect((div.querySelectorAll('.custom-tooltip-value')[1] as HTMLElement).innerText).toBe(
      `${plot.chart.getData()[2].size}`
    );
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
  });
});
