import { Pie } from '../../src/plots/pie';
import { delay } from '../utils/delay';
import { createDiv } from '../utils/dom';

describe('pie tooltip', () => {
  const div = createDiv();
  const data = [
    { type: 'x', value: 0, city: 'HZ' },
    { type: 'y', value: 0, city: 'SZ' },
  ];
  const pie = new Pie(div, {
    data,
    angleField: 'value',
    colorField: 'type',
  });
  pie.render();

  it('#2220, tooltip display not same as normal when data ara all zero', async () => {
    const box = pie.chart.geometries[0].elements[0].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

    await delay(80);
    pie.chart.showTooltip(point);
    await delay(100);
    const tooltipName = div.querySelector('.g2-tooltip .g2-tooltip-name');
    expect((tooltipName as HTMLElement).innerText).toBe('x');
  });

  it('formatter works. before: when fields is empty, formatter not works', async () => {
    pie.update({ tooltip: { fields: [], formatter: () => ({ name: 'xxx', value: 'yyy' }) } });
    const tooltipController = pie.chart.getController('tooltip');
    const box = pie.chart.geometries[0].elements[0].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

    await delay(80);
    pie.chart.showTooltip(point);
    await delay(100);
    // @ts-ignore
    let items = tooltipController.getTooltipItems(point);
    expect(items[0].name).toBe('xxx');
    expect(items[0].value).toBe('yyy');

    pie.update({ tooltip: { fields: null, formatter: () => ({ name: 'xxx', value: 'yyy' }) } });

    pie.chart.showTooltip(point);
    await delay(100);
    // @ts-ignore
    items = tooltipController.getTooltipItems(point);
    expect(items[0].name).toBe('xxx');
    expect(items[0].value).toBe('yyy');
  });

  afterEach(() => {
    pie.chart.clear();
  });

  afterAll(() => {
    pie.destroy();
  });
});
