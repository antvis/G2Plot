import { Shape } from '@antv/g';
import textHide from './textHide';

/** 根据变化进行抽样，保留变化较大的点，类似于点简化算法*/
export default function nodesResamplingByChange(shape: Shape, cfg, index, responsive) {
  const nodes = responsive.nodes.nodes;
  const tolerance = responsive.cfg.tolerance;
  if (index <= 1) {
    return;
  }
  const current = nodes[index];
    // const previous = nodes[index-1];
  const previous = findPrevious(index, nodes);
  const distX = previous.centerX - current.centerX;
  const distY = previous.centerY - current.centerY;
  const dist = Math.sqrt(distX * distX + distY * distY);
  if (dist < tolerance) {
    textHide(shape);
    shape.set('blank', true);
  }
}

function findPrevious(index, nodes) {
  for (let i = index - 1; i > 0; i--) {
    const node = nodes[i];
    if (!node.shape.get('blank')) {
      return node;
    }
  }
}
