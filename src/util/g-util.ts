import * as MatrixUtil from '@antv/matrix-util';
import { clone } from '@antv/util';
import { Util } from '@antv/g2';

export function groupTransform(group, actions) {
  const ulMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  const matrix = MatrixUtil.transform(ulMatrix, actions);
  group.setMatrix(matrix);
}

export function transform(actions, matrix?) {
  const ulMatrix = matrix ? clone(matrix) : [1, 0, 0, 0, 1, 0, 0, 0, 1];
  return MatrixUtil.transform(ulMatrix, actions);
}

export function move(element, x, y, matrix?) {
  const ulMatrix = matrix ? clone(matrix) : [1, 0, 0, 0, 1, 0, 0, 0, 1];
  ulMatrix[6] = x;
  ulMatrix[7] = y;
  element.setMatrix(ulMatrix);
}

export function translate(element, x, y) {
  Util.translate(element, x, y);
}

export function rotate(element, radian) {
  Util.rotate(element, radian);
}