import { Util } from '@antv/g2';
import { IGroup, IShape } from '@antv/g2/lib/dependents';

export function groupTransform(group: IGroup | IShape, actions) {
  const ulMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  const matrix = Util.transform(ulMatrix, actions);
  group.setMatrix(matrix);
}
