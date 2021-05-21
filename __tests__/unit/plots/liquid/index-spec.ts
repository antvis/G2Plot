import { Liquid } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/liquid/constants';
import { createDiv } from '../../../utils/dom';

export const getClipPath = (liquid) => liquid.chart.middleGroup.findAllByName('waves')[0].get('clipShape').attr('path');
export const getRadius = (liquid) => getClipPath(liquid)[1][2];
describe('liquid', () => {
  it('liquid', () => {
    const liquid = new Liquid(createDiv(), {
      width: 600,
      height: 300,
      autoFit: false,
      percent: 0.45,
    });

    liquid.render();

    expect(liquid.chart.geometries[0].elements.length).toBe(1);
    expect(liquid.options.radius).toBe(0.9);

    expect(getRadius(liquid)).toBe(134);

    // 宽 < 高，按照高度来设置 radius
    liquid.changeSize(300, 500);
    expect(getRadius(liquid)).toBe(134);

    // 宽 < 高，按照高度来设置 radius
    liquid.changeSize(500, 500);
    expect(getRadius(liquid)).toBe(224);

    // 默认配置项
    // @ts-ignore
    expect(liquid.getDefaultOptions()).toBe(Liquid.getDefaultOptions());

    liquid.destroy();
  });

  it('outline & wave', () => {
    const liquid = new Liquid(createDiv(), {
      width: 600,
      height: 300,
      autoFit: false,
      percent: 0.3,
    });

    liquid.render();
    expect(liquid.options.outline).toEqual({ border: 2, distance: 0 });
    expect(liquid.options.wave).toEqual({ count: 3, length: 192 });

    expect(getRadius(liquid)).toBe(134);
    expect(liquid.chart.middleGroup.findAllByName('wrap')[0].attr('lineWidth')).toBe(2);
    expect(liquid.chart.middleGroup.findAllByName('waterwave-path').length).toBe(3);
    expect(liquid.chart.middleGroup.findAllByName('waterwave-path')[0].get('animations')[0].toAttrs.matrix[6]).toBe(
      192
    );

    liquid.update({
      outline: {
        border: 4,
        distance: 8,
      },
      wave: {
        count: 5,
        length: 128,
      },
    });

    expect(liquid.options.outline).toEqual({ border: 4, distance: 8 });
    expect(liquid.options.wave).toEqual({ count: 5, length: 128 });

    expect(getRadius(liquid)).toEqual(133);
    expect(liquid.chart.middleGroup.findAllByName('wrap')[0].attr('lineWidth')).toBe(4);
    expect(liquid.chart.middleGroup.findAllByName('waterwave-path').length).toBe(5);
    expect(liquid.chart.middleGroup.findAllByName('waterwave-path')[0].get('animations')[0].toAttrs.matrix[6]).toBe(
      128
    );

    liquid.destroy();
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

    liquid.destroy();
  });

  it('defaultOptions 保持从 constants 中获取', () => {
    expect(Liquid.getDefaultOptions()).toEqual(DEFAULT_OPTIONS);
  });
});
