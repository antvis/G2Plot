import {
  initCanvas,
  getUnitPatternSize,
  getSymbolsPosition,
  drawBackground,
  transformMatrix,
} from '../../../../src/utils/pattern/util';
import { DotPatternCfg } from '../../../../src/types/pattern';
import { getPixelColor } from '../../../utils/getPixelColor';

describe('utils', () => {
  const width = 30,
    height = 30;
  let canvas = null;

  it('initCanvas', () => {
    canvas = initCanvas(width, height);
    document.body.appendChild(canvas);
    expect(canvas.width).toBe(60);
    expect(canvas.height).toBe(60);
  });

  it('getPixelColor', () => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#989898';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    expect(getPixelColor(canvas, width / 2, height / 2).hex).toEqual('#989898');
    expect(getPixelColor(canvas, width + 1, height + 1).hex).toEqual('#000000'); // 超出范围，黑色
  });

  it('drawBackground', () => {
    const defaultDotPatternCfg = {
      backgroundColor: '#eee', // 为了测试背景色填充
    };
    const ctx = canvas.getContext('2d');
    drawBackground(ctx, defaultDotPatternCfg as DotPatternCfg, width, height);
    const color = getPixelColor(canvas, width / 2, height / 2).hex;
    expect(color).toEqual('#eeeeee');
  });

  it('getUnitPatternSize', () => {
    expect(getUnitPatternSize(4, 6, false)).toBe(10);
    expect(getUnitPatternSize(4, 6, true)).toBe(20);
  });

  it('getSymbolsPosition', () => {
    expect(getSymbolsPosition(12, false)).toEqual([[6, 6]]);
    expect(getSymbolsPosition(12, true)).toEqual([
      [3, 3],
      [9, 9],
    ]);
  });

  it('transformMatrix', () => {
    expect(transformMatrix(2, 45)).toEqual({
      a: 0.3535533905932738,
      b: 0.35355339059327373,
      c: -0.35355339059327373,
      d: 0.3535533905932738,
      e: 0,
      f: 0,
    });
    expect(transformMatrix(1, 45)).toEqual({
      a: 0.7071067811865476,
      b: 0.7071067811865475,
      c: -0.7071067811865475,
      d: 0.7071067811865476,
      e: 0,
      f: 0,
    });
  });
});
