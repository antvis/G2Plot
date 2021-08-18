import { Violin } from '../../../../src';
import { BASE_VIOLIN_DATA } from '../../../data/violin';
import { createDiv } from '../../../utils/dom';

describe('violin tooltip', () => {
  const div = createDiv();
  const violin = new Violin(div, {
    width: 400,
    height: 500,
    data: BASE_VIOLIN_DATA,
    xField: 'type',
    yField: 'value',
  });

  violin.render();

  it('default', () => {
    const box = violin.chart.views[0].geometries[0].elements[0].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

    violin.chart.showTooltip(point);
    expect(div.querySelectorAll('.g2-tooltip-list-item').length).toBe(5);
    violin.chart.hideTooltip();
  });

  it('tooltip: fields', () => {
    violin.update({
      seriesField: 'species',
      tooltip: {
        fields: ['species', 'high', 'q1', 'q3', 'low', 'median'],
      },
    });
    const box = violin.chart.views[0].geometries[0].elements[0].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    violin.chart.showTooltip(point);
    expect(div.querySelectorAll('.g2-tooltip-list-item').length).toBe(6);
    violin.chart.hideTooltip();
  });

  it('tooltip + meta', () => {
    violin.update({
      meta: {
        high: {
          alias: '最大值',
          formatter: (v) => `${v.toFixed(2)} %`,
        },
        low: {
          alias: '最小值',
          formatter: (v) => `${v.toFixed(2)} %`,
        },
        species: {
          alias: '品类',
        },
      },
    });

    const box = violin.chart.views[0].geometries[0].elements[0].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    violin.chart.showTooltip(point);
    const items = div.querySelectorAll('.g2-tooltip-name');
    expect((items[0] as HTMLElement).innerText).toBe('品类');
    expect((items[1] as HTMLElement).innerText).toBe('最大值');
    expect((items[4] as HTMLElement).innerText).toBe('最小值');
    expect((div.querySelectorAll('.g2-tooltip-value')[4] as HTMLElement).innerText).toMatch('%');
    violin.chart.hideTooltip();
  });

  it('tooltip: customContent', () => {
    violin.update({
      tooltip: {
        customContent: () => '<div class="custom-tooltip">xxx</div>',
      },
    });
    const box = violin.chart.views[0].geometries[0].elements[0].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    violin.chart.showTooltip(point);
    expect((div.querySelector('.custom-tooltip') as HTMLElement).innerText).toBe('xxx');
    violin.chart.hideTooltip();
  });

  it('tooltip: false', () => {
    // @ts-ignore
    expect(violin.chart.options.tooltip).not.toBe(false);
    // @ts-ignore
    expect(violin.chart.getController('tooltip').isVisible()).toBe(true);
    violin.update({ tooltip: false });
    // @ts-ignore
    expect(violin.chart.options.tooltip).toBe(false);
    // @ts-ignore
    expect(violin.chart.getController('tooltip').isVisible()).toBe(false);
  });

  afterAll(() => {
    violin.destroy();
  });
});
