/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { each } from '@antv/util';
import { getMean } from './math';

export function rgb2arr(str: string) {
  const colorStr: string = str.indexOf('#') === 0 ? str.substr(1) : str;
  const arr = [];
  arr.push(parseInt(colorStr.substr(0, 2), 16));
  arr.push(parseInt(colorStr.substr(2, 2), 16));
  arr.push(parseInt(colorStr.substr(4, 2), 16));
  return arr;
}

export function toHex(value) {
  let v;
  v = Math.round(value);
  v = v.toString(16);
  if (v.length === 1) {
    v = `0${value}`;
  }
  return v;
}

export function arr2rgb(arr) {
  return `#${toHex(arr[0]) + toHex(arr[1]) + toHex(arr[2])}`;
}

export function mappingColor(band, gray) {
  let reflect;
  each(band, (b) => {
    const map = b;
    if (gray >= map.from && gray < map.to) {
      reflect = map.color;
    }
  });
  return reflect;
}

/**
 * deltaE
 * calculate color euclidean distance of rgb
 */
export function colorDistance(a: string, b: string) {
  const rgb_a = rgb2arr(a);
  const rgb_b = rgb2arr(b);
  return Math.sqrt(
    Math.pow(rgb_b[0] - rgb_a[0], 2) + Math.pow(rgb_b[1] - rgb_a[1], 2) + Math.pow(rgb_b[2] - rgb_a[2], 2)
  );
}

export function colorDistanceInRGBSpace(a: string, b: string) {
  const rgb_a = rgb2arr(a);
  const rgb_b = rgb2arr(b);
  return {
    r: Math.abs(rgb_b[0] - rgb_a[0]),
    g: Math.abs(rgb_b[1] - rgb_a[1]),
    b: Math.abs(rgb_b[2] - rgb_a[2]),
  };
}

export function getAverageColorDistanceInRGB(colorPalette: string[]) {
  const r_dist = [];
  const g_dist = [];
  const b_dist = [];
  for (let i = 0; i < colorPalette.length - 1; i++) {
    const current = colorPalette[i];
    const next = colorPalette[i + 1];
    const d = colorDistanceInRGBSpace(current, next);
    r_dist.push(d.r);
    g_dist.push(d.g);
    b_dist.push(d.b);
  }

  return {
    r: getMean(r_dist),
    g: getMean(g_dist),
    b: getMean(b_dist),
  };
}

export function extendColorByRGBDistance(originColor: string, dist: any, direction: number) {
  const rgb = rgb2arr(originColor);
  const r = rgb[0] + dist.r * direction;
  const g = rgb[1] + dist.g * direction;
  const b = rgb[2] + dist.b * direction;
  return arr2rgb([r, g, b]);
}

export function intersectColor(a: string, b: string) {
  const rgb_a = rgb2arr(a);
  const rgb_b = rgb2arr(b);
  const average_r = (rgb_a[0] + rgb_b[0]) / 2;
  const average_g = (rgb_a[1] + rgb_b[1]) / 2;
  const average_b = (rgb_a[2] + rgb_b[2]) / 2;
  return arr2rgb([average_r, average_b, average_g]);
}

// 根据YIQ亮度判断指定颜色取反色是不是白色
// http://24ways.org/2010/calculating-color-contrast
export const isContrastColorWhite = (rgb: string): boolean => {
  const [r, g, b] = rgb2arr(rgb);
  const isDark = (r * 299 + g * 587 + b * 114) / 1000 < 128;

  return isDark;
};
