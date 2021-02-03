import { Waterfall } from '../../src';
import { createDiv } from '../utils/dom';

describe('#2264', () => {
  const data = [
    { type: '日用品', money: 300 },
    { type: '伙食费', money: 900 },
    { type: '交通费', money: -200 },
    { type: '水电费', money: 300 },
    { type: '房租', money: 1200 },
    { type: '商场消费', money: 1000 },
    { type: '应酬交际', money: 2000 },
    { type: '总费用', money: 5900 },
  ];

  const waterfall = new Waterfall(createDiv(), {
    width: 400,
    height: 300,
    xField: 'type',
    yField: 'money',
    data: data,
    tooltip: {
      formatter: () => {
        return { name: 'name', value: 'test' };
      },
    },
  });

  it('tooltip formater could not works', () => {
    waterfall.render();
    const tooltipController = waterfall.chart.getController('tooltip');
    // @ts-ignore
    expect(tooltipController.isVisible()).toBe(true);
    const box = waterfall.chart.geometries[0].elements[0].shape.getBBox();
    // @ts-ignore
    const items = tooltipController.getTooltipItems({ x: box.x + box.width / 2, y: box.y + box.height / 2 });
    // @ts-ignore
    expect(items[0].name).toBe('name');
    // @ts-ignore
    expect(items[0].value).toBe('test');
  });

  afterAll(() => {
    waterfall.destroy();
  });
});
