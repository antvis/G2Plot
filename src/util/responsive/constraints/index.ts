import columnWidth from './column-width';
import elementCollision from './element-collision';
import elementDist from './element-dist';
import elementDistVertical from './element-dist-vertical';
import elementWidth from './element-width';
import minRingThickness from './min-ring-thickness';
import ringThickness from './ring-thickness';

/** constraints约束库 */
export interface IConstraint {
  usage: string;
  type: string;
  method: (...args: any) => any;
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

export function registerResponsiveConstraint(name, constraint: IConstraint) {
  // todo: 防止覆盖
  constraintsLib[name] = constraint;
}
