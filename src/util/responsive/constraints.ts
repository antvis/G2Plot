import * as MathUtil from '../math';
/** constraints约束库 */
export interface IConstraint {
  type: string;
  expression: Function;
}

// todo: constraint加入option
function elementDist(a, b) {
  const polygonA = [ a.topLeft, a.topRight, a.bottomRight, a.bottomLeft ]; // 顶点顺时针
  const polygonB = [ b.topLeft, b.topRight, b.bottomRight, b.bottomLeft ];
  const dist = MathUtil.minDistBetweenConvexPolygon(polygonA, polygonB);
  return Math.round(dist) >= 5;
}

function elementDistVertical(a, b) {
  const dist = Math.abs(a.bottom - b.top);
  return Math.round(dist) >= 5;
}

function elementCollision(a, b) {
  console.log('coll');
  const polygonA = [ a.topLeft, a.topRight, a.bottomRight, a.bottomLeft ]; // 顶点顺时针
  const polygonB = [ b.topLeft, b.topRight, b.bottomRight, b.bottomLeft ];
  const dist = MathUtil.minDistBetweenConvexPolygon(polygonA, polygonB);
  return Math.round(dist) >= 2;
}

function elementWidth(node, region) {
  return node.width < region.width * 0.15;
}

function columnWidth(node, region) {
  return region.width * 0.6;
}

function ringThickness(node, region) {
  return region.radius * 0.8;
}

function minRingThickness(node, region) {
  const minThicknessPixel = 2;
  const minThickness = region.coord.radius / minThicknessPixel;
  return Math.min(minThickness, node.value);
}

export const constraintsLib = {
  elementDist: {
    type:'chain',
    usage: 'compare',
    expression: elementDist,
  },
  elementDistVertical: {
    type: 'chain',
    usage: 'compare',
    expression: elementDistVertical,
  },
  elementCollision: {
    type:'group',
    usage: 'compare',
    expression: elementCollision,
  },
  elementWidth: {
    type:'padding',
    usage: 'compare',
    expression: elementWidth,
  },
  columnWidth: {
    type:'padding',
    usage:'assign',
    expression: columnWidth,
  },
  ringThickness: {
    type: 'padding',
    usage: 'assign',
    expression: ringThickness,
  },
  minRingThickness: {
    type:'padding',
    usage: 'assign',
    expression: minRingThickness,
  },
};


export function registerConstraint(name, constraint:IConstraint) {
  // todo: 防止覆盖
  constraintsLib[name] = constraint;
}
