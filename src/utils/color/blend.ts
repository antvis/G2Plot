import colorUtil from '@antv/color-util';
/*
 * interpolates between a set of colors uzing a bezier spline
 * blend mode formulas taken from http://www.venture-ware.com/kevin/coding/lets-learn-math-photoshop-blend-modes/
 */

const each =
  (f) =>
  (c0: number[], c1: number[]): number[] => {
    const out = [];
    out[0] = f(c0[0], c1[0]);
    out[1] = f(c0[1], c1[1]);
    out[2] = f(c0[2], c1[2]);
    return out;
  };

/**
 * 混合方法集合
 */
const blendObject = {
  normal: (a: number) => a,
  multiply: (a: number, b: number) => (a * b) / 255,
  screen: (a: number, b: number) => 255 * (1 - (1 - a / 255) * (1 - b / 255)),
  overlay: (a: number, b: number) => (b < 128 ? (2 * a * b) / 255 : 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255))),
  darken: (a: number, b: number) => (a > b ? b : a),
  lighten: (a: number, b: number) => (a > b ? a : b),
  dodge: (a: number, b: number) => {
    if (a === 255) return 255;
    a = (255 * (b / 255)) / (1 - a / 255);
    return a > 255 ? 255 : a;
  },
  burn: (a: number, b: number) => {
    // 参考 w3c 的写法，考虑除数为 0 的情况
    if (b === 255) return 255;
    else if (a === 0) return 0;
    else return 255 * (1 - Math.min(1, (1 - b / 255) / (a / 255)));
  },
};

/**
 * 获取混合方法
 */
export const innerBlend = (mode: string) => {
  if (!blendObject[mode]) {
    throw new Error('unknown blend mode ' + mode);
  }
  return blendObject[mode];
};

/**
 * 混合颜色，并处理透明度情况
 * 参考：https://www.w3.org/TR/compositing/#blending
 * @param c0
 * @param c1
 * @param mode 混合模式
 * @return rbga
 */
export function blend(c0: string, c1: string, mode = 'normal') {
  // blendRgbArr: 生成不考虑透明度的 blend color: [r, g, b]
  const blendRgbArr = each(innerBlend(mode))(colorToArr(c0), colorToArr(c1));

  const [r0, g0, b0, a0] = colorToArr(c0);
  const [r1, g1, b1, a1] = colorToArr(c1);

  const a = Number((a0 + a1 * (1 - a0)).toFixed(2));

  const r = Math.round(
    ((a0 * (1 - a1) * (r0 / 255) + a0 * a1 * (blendRgbArr[0] / 255) + (1 - a0) * a1 * (r1 / 255)) / a) * 255
  );
  const g = Math.round(
    ((a0 * (1 - a1) * (g0 / 255) + a0 * a1 * (blendRgbArr[1] / 255) + (1 - a0) * a1 * (g1 / 255)) / a) * 255
  );
  const b = Math.round(
    ((a0 * (1 - a1) * (b0 / 255) + a0 * a1 * (blendRgbArr[2] / 255) + (1 - a0) * a1 * (b1 / 255)) / a) * 255
  );

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * 统一颜色输入的格式 [r, g, b, a]
 * 参考：https://www.w3.org/TR/compositing/#blending
 * @param c color
 * @return [r, g, b, a]
 */
export function colorToArr(c: string): number[] {
  const color = c.replace('/s+/g', ''); // 去除所有空格
  let rgbaArr: any[];

  // 'red' -> [r, g, b, 1]
  if (typeof color === 'string' && !color.startsWith('rgba') && !color.startsWith('#')) {
    return (rgbaArr = colorUtil.rgb2arr(colorUtil.toRGB(color)).concat([1]));
  }

  // rgba(255, 200, 125, 0.5) -> [r, g, b, a]
  if (color.startsWith('rgba')) rgbaArr = color.replace('rgba(', '').replace(')', '').split(',');

  // '#fff000' -> [r, g, b, 1]
  if (color.startsWith('#')) rgbaArr = colorUtil.rgb2arr(color).concat([1]); // 如果是 16 进制（6 位数），默认透明度 1

  // [r, g, b, a] 前三位取整
  return rgbaArr.map((item, index) => (index === 3 ? Number(item) : item | 0));
}
