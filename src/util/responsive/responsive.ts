/** 可插拔的responsive模块 */
import Nodes, { INode } from './nodes';
import * as _ from '@antv/util';
import { BBox, Shape } from '@antv/g';
import { constraintsLib } from '../responsive/constraints';
import { rulesLib } from '../responsive/rules';

interface IConstraint {
  name: string;
  expression: Function;
  strength?: 'required' | 'strong' | 'medium' | 'weak';
  weight?: Number;
}

interface IRule {
  name: string;
  method?: Function;
  options?: any;
}

interface ResponsiveCfg {
  region? : BBox;
  nodes: Nodes;
  constraints: any[];
  rules?: any[];
  iterationTime?: number;
}

export default class Responsive {
  region: BBox;
  nodes: Nodes;
  constraints: any[];
  rules: any[];
  iterationTime: number = 10;
  iterationIndex: number = 0;

  constructor(cfg: ResponsiveCfg) {
    _.assign(this, cfg);
    if (this.rules) {
      this.iterationTime = this.rules.length;
    }
    this.start();
    this._run();
  }

  public start() {
  }

  public iteration() {
    if (this.rules) this._applyRules();
  }

  public end() {
  }

  private _run() {
    let constraintPassed = this._constraintsTest();
    while (!constraintPassed) {
      if (this.iterationIndex > this.iterationTime - 1) {
        break;
      }
      this.nodes.measureNodes();
      this.iteration();
      this.nodes.measureNodes();
      constraintPassed = this._constraintsTest();
      this.iterationIndex++;
    }
    this.end();
  }

  private _constraintsTest() {
    const constraintName = this.constraints[0];
    const constraint = constraintsLib[constraintName];
    const nodes = this.nodes.nodes;
        /** chain */
    for (let i = 0; i < nodes.length - 1; i++) {
      const a = nodes[i];
      const b = nodes[i + 1];
      if (constraint.expression(a, b) === false) {
        return false;
      }
    }
    return true;
  }

  private _applyRules() {
    const ruleCfg = this.rules[this.iterationIndex];
    const rule = rulesLib[ruleCfg.name];
    const options = ruleCfg.options ? ruleCfg.options :{};
    const nodes = this.nodes.nodes;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
            /** apply rule上下文 */
      this._applyRule(node.shape, rule, options, i, nodes);
    }
  }

  private _applyRule(shape:Shape, rule, options, index, nodes) {
    rule(shape, options, index, nodes);
  }

}
