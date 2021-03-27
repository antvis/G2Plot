import { Pie } from '../../../../src/plots/pie';
import { delay } from '../../../utils/delay';
import { createDiv } from '../../../utils/dom';

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
    animation: false,
  });
  pie.render();

  it('close tooltip', () => {
    // @ts-ignore
    expect(pie.chart.options.tooltip).not.toBe(false);
    // @ts-ignore
    expect(pie.chart.getController('tooltip').isVisible()).toBe(true);
    pie.update({ tooltip: false });
    // @ts-ignore
    expect(pie.chart.options.tooltip).toBe(false);
    // @ts-ignore
    expect(pie.chart.getController('tooltip').isVisible()).toBe(false);
  });

  it('specify fields', async () => {
    pie.update({
      meta: {
        type: { alias: '类型' },
        value: { alias: '数值' },
        city: { alias: '城市' },
      },
      tooltip: {
        fields: ['type', 'value', 'city'],
      },
    });

    const tooltipController = pie.chart.getController('tooltip');
    const box = pie.chart.geometries[0].elements[0].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

    pie.chart.showTooltip(point);
    const items = tooltipController.getTooltipItems(point);
    expect(items.length).toBe(3);
    expect(items[0].name).toBe('类型');
    expect(items[1].name).toBe('数值');
    expect(items[2].name).toBe('城市');
  });

  it('data is all zero', async () => {
    pie.changeData(data.map((d) => ({ ...d, value: 0 })));

    const tooltipController = pie.chart.getController('tooltip');
    const box = pie.chart.geometries[0].elements[0].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

    pie.chart.showTooltip(point);
    await delay(100);
    // @ts-ignore
    let items = tooltipController.getTooltipItems(point);
    expect(items.length).toBe(3);
    expect(items[0].name).toBe('类型');
    expect(items[1].name).toBe('数值');
    expect(items[2].name).toBe('城市');
    expect(items[1].value).toBe('0');
    expect(items[0].value).toBe(data[0].type);
    expect(items[2].value).toBe(data[0].city);

    pie.update({ tooltip: { fields: undefined } });
    pie.chart.showTooltip(point);
    await delay(100);
    // @ts-ignore
    items = tooltipController.getTooltipItems(point);
    expect(items.length).toBe(1);
    expect(items[0].name).toBe(data[0].type);
    expect(items[0].value).toBe('0');

    pie.update({ tooltip: { fields: ['value'] } });
    pie.chart.showTooltip(point);
    await delay(100);
    // @ts-ignore
    items = tooltipController.getTooltipItems(point);
    expect(items.length).toBe(1);
    expect(items[0].name).toBe('数值');
    expect(items[0].value).toBe('0');
  });

  it('custom formatter', async () => {
    pie.update({
      data,
      tooltip: {
        fields: ['type', 'value', 'city'],
        formatter: (datum) => ({ name: `${datum.city}-${datum.type}`, value: `${datum.value}-xxxx` }),
      },
    });

    const tooltipController = pie.chart.getController('tooltip');
    const box = pie.chart.geometries[0].elements[0].shape.getBBox();
    const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

    pie.chart.showTooltip(point);
    await delay(100);
    // @ts-ignore
    const items = tooltipController.getTooltipItems(point);
    expect(items[0].name).toBe(`${data[0].city}-${data[0].type}`);
    expect(items[0].value).toBe(`${data[0].value}-xxxx`);
  });

  afterEach(() => {
    pie.chart.clear();
  });

  afterAll(() => {
    pie.destroy();
  });
});
