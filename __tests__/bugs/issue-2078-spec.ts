import { Waterfall } from '../../src';
import { createDiv } from '../utils/dom';

describe('#2078', () => {
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
    tooltip: false,
  });

  it('关闭 tooltip', () => {
    waterfall.render();
    // @ts-ignore
    expect(waterfall.chart.getController('tooltip').isVisible()).toBe(false);
  });

  afterAll(() => {
    waterfall.destroy();
  });
});
