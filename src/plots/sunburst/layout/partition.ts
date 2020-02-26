import { round } from './round';
import { dice } from '../../treemap/layout/dice';
import { each } from '@antv/util';

/** reference: https://github.com/d3/d3-hierarchy/blob/master/src/partition.js */

export default function patition(root) {
  calculateDepth(root);
  const dx = 1;
  const dy = 1;
  const isRound = false;
  // const n = root.height + 1;
  const n = 1;
  root.x0 = 0;
  root.y0 = 0;
  root.x1 = dx;
  root.y1 = dy / n;
  loopChildren(root, positionNode(dy, n));
  if (isRound) {
    loopChildren(root, round);
  }
  return root;
}

function positionNode(dy, n) {
  return function(node) {
    if (node.children) {
      dice(node, node.x0, (dy * (node.depth + 1)) / n, node.x1, (dy * (node.depth + 2)) / n);
    }
    let x0 = node.x0,
      y0 = node.y0,
      x1 = node.x1,
      y1 = node.y1;
    if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
    if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
    node.x0 = x0;
    node.y0 = y0;
    node.x1 = x1;
    node.y1 = y1;
  };
}

function loopChildren(root, callback) {
  const nodes = [root];
  let node = root;
  while ((node = nodes.pop())) {
    callback(node);
    const children = node.children;
    if (children) {
      for (let i = children.length - 1; i >= 0; --i) {
        nodes.push(children[i]);
      }
    }
  }
}

function calculateDepth(root) {
  root.x0 = 0;
  root.x1 = 1;
  const { children } = root;
  if (children) {
    each(children, (n) => {
      n.parent = root;
      n.depth = root.depth + 1;
      calculateDepth(n);
    });
  }
}
