import { IGroup, IShape, IElement } from '@antv/g-base';
import { Util } from '@antv/g2';
import { ext } from '@antv/matrix-util';

const ORIGIN_MATRIX = [1, 0, 0, 0, 1, 0, 0, 0, 1];

/**
 * 对元素设置一些操作（旋转、移动等），每次重置 matrix
 * @param group
 * @param actions
 */
export function groupTransform(group: IGroup | IShape, actions: any[][]) {
  const ulMatrix = [...ORIGIN_MATRIX];
  const matrix = Util.transform(ulMatrix, actions);
  group.setMatrix(matrix);
}

/**
 * 矩阵变换
 * @param actions
 * @param matrix
 */
export function transform(actions: any[][], matrix?: number[]) {
  const ulMatrix = matrix ? [...matrix] : [...ORIGIN_MATRIX];
  return ext.transform(ulMatrix, actions);
}

/**
 * 移动
 * @param element
 * @param x
 * @param y
 * @param matrix
 */
export function move(element: IGroup | IShape, x: number, y: number, matrix?: number[]) {
  const ulMatrix = matrix ? [...matrix] : [...ORIGIN_MATRIX];
  ulMatrix[6] = x;
  ulMatrix[7] = y;
  element.setMatrix(ulMatrix);
}

export function translate(element: IGroup | IShape, x: number, y: number) {
  Util.translate(element, x, y);
}

export function rotate(element: IGroup | IShape, radian: number) {
  Util.rotate(element, radian);
}
