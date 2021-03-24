import { Liquid } from '../../../../src';
import { createDiv } from '../../../utils/dom';

export const getClipPath = (liquid) => liquid.chart.middleGroup.findAllByName('waves')[0].get('clipShape').attr('path');
export const getRadius = (liquid) => getClipPath(liquid)[1][2];
describe('liquid', () => {
  const liquid = new Liquid(createDiv(), {
    width: 600,
    height: 300,
    autoFit: false,
    percent: 0.45,
  });

  liquid.render();

  const getWaveColor = (liquid) =>
    liquid.chart.middleGroup.getChildren()[0].getChildren()[0].getChildren()[0].attr('fill');

  it('color: 默认从主题色获取', () => {
    expect(liquid.chart.geometries[0].elements.length).toBe(1);
    expect(liquid.options.color).toBeUndefined();

    expect(getWaveColor(liquid)).toBe(liquid.chart.getTheme().defaultColor);
  });

  it('color, 更新主题色', () => {
    liquid.update({ theme: { defaultColor: 'red' } });

    expect(getWaveColor(liquid)).toBe('red');
  });

  it('color, 更新 color', () => {
    liquid.update({ color: 'green' });

    expect(getWaveColor(liquid)).toBe('green');
  });

  it('color, 更新主题色', () => {
    liquid.update({ theme: { defaultColor: 'blue' } });
    expect(getWaveColor(liquid)).not.toBe('blue');

    liquid.update({ color: undefined });
    expect(getWaveColor(liquid)).toBe('blue');
  });

  it('style, 可以覆盖 color 以及主题色', () => {
    liquid.update({ liquidStyle: { fill: 'red' } });
    expect(getWaveColor(liquid)).toBe('red');

    liquid.update({ color: 'green' });
    expect(getWaveColor(liquid)).not.toBe('green');
    expect(getWaveColor(liquid)).toBe('red');
  });

  afterAll(() => {
    liquid.destroy();
  });
});
