import elementDist from './elementDist';
import elementDistVertical from './elementDistVertical';
import elementCollision from './elementCollision';
import elementWidth from './elementWidth';
import columnWidth from './columnWidth';
import ringThickness from './ringThickness';
import minRingThickness from './minRingThickness';

/** constraints约束库 */
export interface IConstraint {
  type: string;
  expression: Function;
}

export const constraintsLib = {
  elementDist,
  elementDistVertical,
  elementCollision,
  elementWidth,
  columnWidth,
  ringThickness,
  minRingThickness,
};

export function registerConstraint(name, constraint:IConstraint) {
    // todo: 防止覆盖
  constraintsLib[name] = constraint;
}
