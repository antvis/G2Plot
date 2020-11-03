import { Util } from '@antv/g2';

const ORIGIN_MATRIX = [1, 0, 0, 0, 1, 0, 0, 0, 1];

/**
 * 矩阵变换
 * @param actions
 * @param matrix
 */
export function transform(actions: any[][], matrix?: number[]) {
  const ulMatrix = matrix ? [...matrix] : [...ORIGIN_MATRIX];
  return Util.transform(ulMatrix, actions);
}
