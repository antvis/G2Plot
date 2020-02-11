import * as MatrixUtil from '@antv/matrix-util';
import { clone } from '@antv/util';

export function groupTransform(group, actions) {
  const ulMatrix = clone(group.attr('matrix'));
  MatrixUtil.transform(ulMatrix, actions);
  group.setMatrix(ulMatrix);
}
