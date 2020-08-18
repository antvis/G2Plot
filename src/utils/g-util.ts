import { IGroup, IShape } from '@antv/g-base';
import { Util } from '@antv/g2';

/**
 * 对元素设置一些操作（旋转、移动等），每次重置 matrix
 * @param group
 * @param actions
 */
export function groupTransform(group: IGroup | IShape, actions: any[][]) {
  const ulMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  const matrix = Util.transform(ulMatrix, actions);
  group.setMatrix(matrix);
}
