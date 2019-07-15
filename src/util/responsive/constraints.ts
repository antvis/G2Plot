import * as MathUtil from '../math';
/** constraints约束库 */
export interface IConstraint {
  type: string;
  expression: Function;
}

function elementDist(a, b) {
  const polygonA = [ a.topLeft, a.topRight, a.bottomRight, a.bottomLeft ]; // 顶点顺时针
  const polygonB = [ b.topLeft, b.topRight, b.bottomRight, b.bottomLeft ];
  const dist = MathUtil.minDistBetweenConvexPolygon(polygonA, polygonB);
  return Math.round(dist) >= 5;
}

function elementDistVertical(a, b) {
  const dist = a.maxY - b.minY;
  return Math.round(dist) >= 5;
}

export const constraintsLib = {
  elementDist: {
    type:'chain',
    expression: elementDist,
  },
  elementDistVertical: {
    type: 'chain',
    expression: elementDistVertical,
  },
};

export function registerConstraint(name, constraint:IConstraint) {
  constraintsLib[name] = constraint;
}
