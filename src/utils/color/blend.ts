/*
 * interpolates between a set of colors uzing a bezier spline
 * blend mode formulas taken from http://www.venture-ware.com/kevin/coding/lets-learn-math-photoshop-blend-modes/
 */

// convert it back again (to a string)
function hexTorgb(color) {
  if (typeof color === 'string' && !color.startsWith('#')) {
    return color;
  }
  const hex = color;
  // @ts-ignore
  return [('0x' + hex[1] + hex[2]) | 0, ('0x' + hex[3] + hex[4]) | 0, ('0x' + hex[5] + hex[6]) | 0];
}

function componentToHex(c) {
  const hex = (c | 0).toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

const each = (f) => (c0, c1) => {
  const out = [];
  out[0] = f(c0[0], c1[0]);
  out[1] = f(c0[1], c1[1]);
  out[2] = f(c0[2], c1[2]);
  return out;
};

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
  burn: (a: number, b: number) => 255 * (1 - (1 - b / 255) / (a / 255)),
};

const innerBlend = (mode) => {
  if (!blendObject[mode]) {
    throw new Error('unknown blend mode ' + mode);
  }
  return blendObject[mode];
};

export function blend(c0: string, c1: string, mode = 'normal') {
  const [r, g, b] = each(innerBlend(mode))(hexTorgb(c0), hexTorgb(c1));

  return rgbToHex(r, g, b);
}
