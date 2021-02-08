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

  it('formatter work in normal cases', async () => {
    pie.update({
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
