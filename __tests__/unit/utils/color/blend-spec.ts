import { rgbToHex, hexTorgb, blend, colorToArr, innerBlend } from '../../../../src/utils/color/blend';
import { nameToHex } from '../../../../src/utils/color/nameToHex';

describe('blend utils', () => {
  it('rgbToHex', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
    expect(rgbToHex(255, 255, 0)).toBe('#ffff00');
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
  });

  it('hexTorgb', () => {
    expect(hexTorgb('#ff0000')).toEqual([255, 0, 0]);
    expect(hexTorgb('#ffff00')).toEqual([255, 255, 0]);
    expect(hexTorgb('#ffffff')).toEqual([255, 255, 255]);
  });

  it('nameToHex', () => {
    expect(nameToHex('red')).toEqual('#ff0000');
    expect(nameToHex('blue')).toEqual('#0000ff');
    expect(nameToHex('lime')).toEqual('#00ff00');
    expect(nameToHex('aliceblue')).toEqual('#f0f8ff');
    expect(nameToHex('ALICEBLUE')).toEqual('#f0f8ff');
  });

  it('colorToArr', () => {
    expect(colorToArr('red')).toEqual([255, 0, 0, 1]);
    expect(colorToArr('rgba(255, 34, 0, 0)')).toEqual([255, 34, 0, 0]);
    expect(colorToArr('rgba(255, 34, 0, 0.4)')).toEqual([255, 34, 0, 0.4]);
    expect(colorToArr('rgba(255, 34, 0, 1)')).toEqual([255, 34, 0, 1]);
    expect(colorToArr('#ff0000')).toEqual([255, 0, 0, 1]);
  });

  it('innerBlend', () => {
    expect(innerBlend('normal')(255)).toBe(255);
    expect(innerBlend('multiply')(255, 200)).toBe(200);
    expect(innerBlend('screen')(255, 255)).toBe(255);
    expect(innerBlend('overlay')(255, 0)).toBe(0);
    expect(innerBlend('overlay')(255, 255)).toBe(255);
    expect(innerBlend('darken')(255, 0)).toBe(0);
    expect(innerBlend('darken')(0, 255)).toBe(0);
    expect(innerBlend('lighten')(255, 0)).toBe(255);
    expect(innerBlend('lighten')(0, 255)).toBe(255);
    expect(innerBlend('dodge')(255, 0)).toBe(255);
    expect(innerBlend('dodge')(0, 255)).toBe(255);
    expect(innerBlend('burn')(0, 255)).toBe(255);
    expect(innerBlend('burn')(255, 0)).toBe(0);
    expect(innerBlend('burn')(200, 100) | 0).toBe(57);
  });

  it('blend', () => {
    expect(blend('rgba(255, 0, 0, 0.3)', 'rgba(0, 0, 255, 0.7)', 'normal')).toBe('rgba(97, 0, 158, 0.79)');
    expect(blend('rgba(255, 0, 0, 0.3)', 'rgba(0, 0, 255, 0.7)', 'multiply')).toBe('rgba(29, 0, 158, 0.79)');
    expect(blend('rgba(255, 0, 0, 0.3)', 'rgba(0, 0, 255, 0.7)', 'screen')).toBe('rgba(97, 0, 226, 0.79)');
    expect(blend('rgba(255, 0, 0, 0.3)', 'rgba(0, 0, 255, 0.7)', 'overlay')).toBe('rgba(29, 0, 226, 0.79)');
    expect(blend('rgba(255, 0, 0, 0.3)', 'rgba(0, 0, 255, 0.7)', 'darken')).toBe('rgba(29, 0, 158, 0.79)');
    expect(blend('rgba(255, 0, 0, 0.3)', 'rgba(0, 0, 255, 0.7)', 'lighten')).toBe('rgba(97, 0, 226, 0.79)');
    expect(blend('rgba(255, 0, 0, 0.3)', 'rgba(0, 0, 255, 0.7)', 'burn')).toBe('rgba(29, 0, 226, 0.79)');
    expect(blend('rgba(255, 0, 0, 0.3)', 'rgba(0, 0, 255, 0.7)', 'dodge')).toBe('rgba(97, 0, 226, 0.79)');
  });
});
