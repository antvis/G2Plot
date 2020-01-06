import { dice } from './dice';
import { slice } from './slice';

// 黄金分割
const ratio = (1 + Math.sqrt(5)) / 2;

export function squarify(root, x, y, width, height) {
  const x1 = x + width;
  const y1 = y + height;
  const { children } = root;
  let value = root.value;
  children.sort((a, b) => {
    return b.value - a.value;
  });
  const rows = [];
  let row;
  let sumValue, maxValue, minValue;
  let alpha, beta;
  let newRatio, minRatio;
  let nodeValue;
  let i, j;

  // todo: 剔除empty node
  for (i = 0; i < children.length - 1; i++) {
    sumValue = children[i + 1].value;
    maxValue = sumValue;
    minValue = sumValue;
    alpha = Math.max(height / width, width / height) / (value * ratio);
    beta = sumValue * sumValue * alpha;
    minRatio = Math.max(maxValue / beta, beta / minValue);
    for (j = i; j < children.length; j++) {
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
    rows.push((row = { value: sumValue, dice: width < height, children: children.slice(i, j) }));
    if (row.dice) dice(row, x, y, width, value ? (y += (height * sumValue) / value) : y1);
    else slice(row, x, y, value ? (x += (width * sumValue) / value) : x1, y1);
    value -= sumValue;
  }
  return rows;
}
