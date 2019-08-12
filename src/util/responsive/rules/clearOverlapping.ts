import { Shape } from '@antv/g';
import textHide from './textHide';

export default function clearOverlapping(shape: Shape, cfg, index, responsive) {
  const nodes = responsive.nodes.nodes;
  const current = nodes[index];
  const overlaped = [];
    /** 找到所有与当前点overlap的node */
  if (!current.shape.get('blank')) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const shape = node.shape;
      if (i !== index && !shape.get('blank')) {
        const isOverlap = isNodeOverlap(current, node);
        if (isOverlap) {
          overlaped.push(node);
        }
      }
    }
  }
    /** overlap处理逻辑 */
  if (overlaped.length > 0) {
    overlaped.push(current);
    overlaped.sort((a, b) => {
      return b.top - a.top;
    });
      /** 隐藏除最高点以外的node */
    _.each(overlaped, (node, index) => {
      if (index > 0) {
        const shape = node.shape;
        textHide(shape);
        shape.set('blank', true);
      }
    });
  }
}

export function isNodeOverlap(nodeA, nodeB) {
  if (nodeA.bottom < nodeB.top || nodeB.bottom < nodeA.top) {
    return false;
  }  if (nodeA.right < nodeB.left || nodeB.right < nodeA.left) {
    return false;
  }
  return true;
}
