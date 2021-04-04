import { Scatter } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/scatter/constant';
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

  it('defaultOptions 保持从 constants 中获取', () => {
    expect(Scatter.getDefaultOptions()).toEqual(DEFAULT_OPTIONS);
  });
});
