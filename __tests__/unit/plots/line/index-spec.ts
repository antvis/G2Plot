import { Line } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('line', () => {
  it('x*y', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => o.type === 'FF'),
      x: 'date',
      y: 'value',
    });

    line.render();
    expect(line.chart).toBeDefined();
    setTimeout(() => {
      line.render();
    }, 1000);
  });

  it('x*y with color', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport,
      x: 'date',
      y: 'value',
      color: 'type',
    });

    line.render();
    expect(line.chart).toBeDefined();
  });
});
