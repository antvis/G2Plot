import { Shape } from '@antv/g';
import * as _ from '@antv/util';
import textHide from './textHide';

export default function clearOverlapping(shape: Shape, _cfg, index, responsive) {
  const nodes = responsive.nodes.nodes;
  const current = nodes[index];
  const overlapped = [];
  /** 找到所有与当前点overlap的node */
  if (!current.shape.get('blank')) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const _shape = node.shape;
      if (i !== index && !_shape.get('blank')) {
        const isOverlap = isNodeOverlap(current, node);
        if (isOverlap) {
          overlapped.push(node);
        }
      }
    }
  }
  /** overlap处理逻辑 */
  if (overlapped.length > 0) {
    overlapped.push(current);
    overlapped.sort((a, b) => {
      return b.top - a.top;
    });
    /** 隐藏除最高点以外的node */
    _.each(overlapped, (node: any, idx: number) => {
      if (idx > 0) {
        const _shape = node.shape;
        textHide(_shape);
        _shape.set('blank', true);
      }
    });
  }
}

export function isNodeOverlap(nodeA, nodeB) {
  if (nodeA.bottom < nodeB.top || nodeB.bottom < nodeA.top) {
    return false;
  }
  if (nodeA.right < nodeB.left || nodeB.right < nodeA.left) {
    return false;
  }
  return true;
}
