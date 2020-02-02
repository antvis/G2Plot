import { dice } from './dice';
import { slice } from './slice';

//reference: https://github.com/d3/d3-hierarchy/blob/master/src/treemap/squarify.js

// 黄金分割
const ratio = (1 + Math.sqrt(5)) / 2;

export default function squarify(root, x0, y0, x1, y1) {
  const { children } = root;
  let value = root.value;
  children.sort((a, b) => {
    return b.value - a.value;
  });
  const rows = [];
  let sumValue, maxValue, minValue;
  let alpha, beta;
  let newRatio, minRatio;
  let nodeValue;
  let i = 0,
    j = 0;

  // todo: 剔除empty node
  while (i < children.length) {
    const width = x1 - x0;
    const height = y1 - y0;
    sumValue = children[j++].value;
    maxValue = sumValue;
    minValue = sumValue;
    alpha = Math.max(height / width, width / height) / (value * ratio);
    beta = sumValue * sumValue * alpha;
    minRatio = Math.max(maxValue / beta, beta / minValue);
    for (; j < children.length; j++) {
      nodeValue = children[j].value;
      sumValue += nodeValue;
      if (nodeValue < minValue) minValue = nodeValue;
      if (nodeValue > maxValue) maxValue = nodeValue;
      beta = sumValue * sumValue * alpha;
      newRatio = Math.max(maxValue / beta, beta / minValue);
      if (newRatio > minRatio) {
        sumValue -= nodeValue;
        break;
      }
      minRatio = newRatio;
    }
    const row = { value: sumValue, dice: width < height, children: children.slice(i, j) };
    rows.push(row);
    if (row.dice) {
      const h = value ? (height * sumValue) / value : height;
      dice(row, x0, y0, x1, y0 + h);
      if (value) {
        y0 += h;
      }
    } else {
      const w = value ? (width * sumValue) / value : width;
      slice(row, x0, y0, x0 + w, y1);
      if (value) {
        x0 += w;
      }
    }
    value -= sumValue;
    i = j;
  }
  return rows;
}
