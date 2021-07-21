import { Funnel } from '../../src';
import { createDiv } from '../utils/dom';

describe('#2616', () => {
  it('funel data is empty', () => {
    const funnelPlot = new Funnel(createDiv(), {
      data: [],
      xField: 'stage',
      yField: 'number',
      legend: false,
    });

    expect(() => {
      funnelPlot.render();
      funnelPlot.destroy();
    }).not.toThrow();
  });
});
