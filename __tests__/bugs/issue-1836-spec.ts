import { Gauge } from '../../src';
import { createDiv } from '../utils/dom';

describe('#1836', () => {
  it('gauge animate', () => {
    const gauge = new Gauge(createDiv(), {
      width: 600,
      height: 300,
      autoFit: false,
      percent: 0.65,
      range: {
        color: 'l(0) 0:#5d7cef 1:#e35767',
      },
    });

    gauge.render();
    expect(gauge.chart.getOptions().animate).toBe(true);
    // 子 view 继承父类
    expect(gauge.chart.views.every((v) => v.getOptions().animate === true)).toBe(true);

    gauge.update({
      ...gauge.options,
      animation: false,
    });
    expect(gauge.chart.getOptions().animate).toBe(false);
    // 子 view 都关闭动画
    expect(gauge.chart.views.every((v) => v.getOptions().animate === false)).toBe(true);
  });
});
