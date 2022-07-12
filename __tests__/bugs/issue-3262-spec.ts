import { Gauge } from '../../src';
import { createDiv } from '../utils/dom';

describe('#3262', () => {
  it('gauge percent 0', () => {
    const gauge = new Gauge(createDiv(), {
      percent: 0,
    });

    gauge.render();

    expect(gauge.chart.views[1].getOptions().data.length).toBe(2);
  });
});
