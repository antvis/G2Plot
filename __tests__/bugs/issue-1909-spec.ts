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

    // @ts-ignore
    expect(liquidPlot.chart.geometries[0].container.getChildren()[1].getChildren()[0].attr('opacity')).toBe(0.2);

    liquidPlot.update({
      liquidStyle: {
        opacity: 0.1,
      },
    });

    // @ts-ignore
    expect(liquidPlot.chart.geometries[0].container.getChildren()[1].getChildren()[0].attr('opacity')).toBeCloseTo(
      0.02,
      5
    );

    liquidPlot.destroy();
  });
});
