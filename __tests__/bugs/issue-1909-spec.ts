import { Liquid } from '../../src';
import { createDiv } from '../utils/dom';

describe('#1909', () => {
  it('liquidStyle', () => {
    const liquidPlot = new Liquid(createDiv(), {
      percent: 0.75,
      liquidStyle: {
        fill: 'red',
      },
    });
    liquidPlot.render();

    const getWaveOpacity = (liquid) =>
      liquid.chart.geometries[0].container.getChildren()[0].getChildren()[0].attr('opacity');

    // @ts-ignore
    expect(getWaveOpacity(liquidPlot)).toBe(0.2);

    liquidPlot.update({
      liquidStyle: {
        opacity: 0.1,
      },
    });

    // @ts-ignore
    expect(getWaveOpacity(liquidPlot)).toBeCloseTo(0.02, 5);

    liquidPlot.destroy();
  });
});
