import { Waterfall } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('waterfall plot', () => {
  const data = [
    { type: '日用品', money: 300 },
    { type: '伙食费', money: 900 },
    { type: '交通费', money: 200 },
    { type: '水电费', money: 300 },
    { type: '房租', money: 1200 },
    { type: '商场消费', money: 1000 },
    { type: '应酬交际', money: 2000 },
    { type: '总费用', money: 5900 },
  ];

  it('shape:waterfall', () => {
    const waterfall = new Waterfall(createDiv(), {
      width: 400,
      height: 300,
      xField: 'type',
      yField: 'money',
      data: data,
    });

    waterfall.render();
    const geometry = waterfall.chart.geometries[0];
    expect(geometry.elements.length).toBe(data.length);

    console.log(geometry);
  });

  it('shape:waterfall showTotal', () => {
    const waterfall = new Waterfall(createDiv(), {
      width: 400,
      height: 300,
      xField: 'type',
      yField: 'money',
      data: data,
      showTotal: true,
    });

    waterfall.render();
    const geometry = waterfall.chart.geometries[0];
    expect(geometry.elements.length).toBe(data.length + 1);
  });
});
