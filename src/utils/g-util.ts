import { IGroup, IShape } from '@antv/g-base';
import { Util } from '@antv/g2';

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
  return Util.transform(ulMatrix, actions);
}
