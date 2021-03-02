import { Liquid } from '../../../../src';
import { createDiv } from '../../../utils/dom';

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

    // @ts-ignore
    expect(liquid.chart.middleGroup.getChildren()[0].getChildren()[0].attr('path')).toEqual([
      ['M', 300, 15],
      ['A', 135, 135, 0, 1, 0, 300, 285],
      ['A', 135, 135, 0, 1, 0, 300, 15],
      ['Z'],
    ]);

    // 宽 < 高，按照高度来设置 radius
    liquid.changeSize(300, 500);

    // @ts-ignore
    expect(liquid.chart.middleGroup.getChildren()[0].getChildren()[0].attr('path')).toEqual([
      ['M', 150, 115],
      ['A', 135, 135, 0, 1, 0, 150, 385],
      ['A', 135, 135, 0, 1, 0, 150, 115],
      ['Z'],
    ]);
    // 宽 < 高，按照高度来设置 radius
    liquid.changeSize(500, 500);

    // @ts-ignore
    expect(liquid.chart.middleGroup.getChildren()[0].getChildren()[0].attr('path')).toEqual([
      ['M', 250, 25],
      ['A', 225, 225, 0, 1, 0, 250, 475],
      ['A', 225, 225, 0, 1, 0, 250, 25],
      ['Z'],
    ]);

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

    expect(liquid.chart.middleGroup.findAllByName('wrap')[0].attr('path')).toEqual([
      ['M', 300, 15],
      ['A', 135, 135, 0, 1, 0, 300, 285],
      ['A', 135, 135, 0, 1, 0, 300, 15],
      ['Z'],
    ]);
    expect(liquid.chart.middleGroup.findAllByName('wrap')[0].attr('lineWidth')).toBe(2);
    expect(liquid.chart.middleGroup.findAllByName('waterwave-path').length).toBe(3);
    expect(liquid.chart.middleGroup.findAllByName('waterwave-path')[0].get('animations')[0].toAttrs.matrix[6]).toBe(
      192
    );

    expect(liquid.chart.middleGroup.findAllByName('waves')[0].get('clipShape').attr('path')).toEqual([
      ['M', 300, 16],
      ['A', 134, 134, 0, 1, 0, 300, 284],
      ['A', 134, 134, 0, 1, 0, 300, 16],
      ['Z'],
    ]);

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

    expect(liquid.chart.middleGroup.findAllByName('wrap')[0].attr('path')).toEqual([
      ['M', 300, 15],
      ['A', 135, 135, 0, 1, 0, 300, 285],
      ['A', 135, 135, 0, 1, 0, 300, 15],
      ['Z'],
    ]);
    expect(liquid.chart.middleGroup.findAllByName('wrap')[0].attr('lineWidth')).toBe(4);
    expect(liquid.chart.middleGroup.findAllByName('waterwave-path').length).toBe(5);
    expect(liquid.chart.middleGroup.findAllByName('waterwave-path')[0].get('animations')[0].toAttrs.matrix[6]).toBe(
      128
    );
    expect(liquid.chart.middleGroup.findAllByName('waves')[0].get('clipShape').attr('path')).toEqual([
      ['M', 300, 25],
      ['A', 125, 125, 0, 1, 0, 300, 275],
      ['A', 125, 125, 0, 1, 0, 300, 25],
      ['Z'],
    ]);

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
});
