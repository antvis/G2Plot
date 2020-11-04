import { Liquid } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('liquid', () => {
  it('liquid', () => {
    const liquid = new Liquid(createDiv(), {
      width: 600,
      height: 300,
      autoFit: false,
      percent: 0.75,
    });

    liquid.render();

    expect(liquid.chart.geometries[0].elements.length).toBe(1);
    expect(liquid.options.radius).toBe(0.9);

    // @ts-ignore
    expect(liquid.chart.middleGroup.getChildren()[0].getChildren()[1].attr('r')).toBe(135);

    // 宽 < 高，按照高度来设置 radius
    liquid.changeSize(300, 500);

    // @ts-ignore
    expect(liquid.chart.middleGroup.getChildren()[0].getChildren()[1].attr('r')).toBe(135); // circle
  });
  it('change data', () => {
    const liquid = new Liquid(createDiv(), {
      width: 600,
      height: 300,
      autoFit: false,
      percent: 0.75,
    });

    liquid.render();
    expect(liquid.chart.geometries[0].elements[0].getData().percent).toBe(0.75);
    liquid.changeData(0.5);
    expect(liquid.chart.geometries[0].elements[0].getData().percent).toBe(0.5);
  });
});
