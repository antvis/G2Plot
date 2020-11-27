import { Scatter } from '../../../../src';
import { data } from '../../../data/gender';
import { createDiv } from '../../../utils/dom';

describe('scatter', () => {
  it('default config', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      data,
      xField: 'weight',
      yField: 'height',
      size: 10,
      xAxis: {
        nice: true,
      },
    });

    scatter.render();
    const { options } = scatter;
    // @ts-ignore
    expect(options.tooltip.showTitle).toBe(false);
    // @ts-ignore
    expect(options.tooltip.showMarkers).toBe(false);
    // @ts-ignore
    expect(options.tooltip.showCrosshairs).toBeTruthy();
    // @ts-ignore
    expect(options.tooltip.crosshairs.type).toEqual('xy');

    scatter.destroy();
  });
});
