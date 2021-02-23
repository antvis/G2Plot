import { Gauge } from '../../src';
import { createDiv } from '../utils/dom';
import { delay } from '../utils/delay';

describe('#2260', () => {
  it('gauge changedata to trigger changedata events', async () => {
    const gauge = new Gauge(createDiv(), {
      percent: 0.75,
      startAngle: Math.PI,
      endAngle: 2 * Math.PI,
    });

    gauge.render();

    let signal1;
    let signal2;
    gauge.on('beforechangedata', () => (signal1 = 'before'));
    gauge.on('afterchangedata', () => (signal2 = 'after'));

    gauge.changeData(0.3);
    await delay(500);
    expect(signal1).toBe('before');
    expect(signal2).toBe('after');
  });
});
