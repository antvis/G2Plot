import { rgbToHex } from '../../../../src/utils/color/blend';

describe('blend', () => {
  it('rgbToHex', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
    expect(rgbToHex(255, 255, 0)).toBe('#ffff00');
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
  });

  //  todo 补全单测
});
