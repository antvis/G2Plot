/** 可插拔的responsive模块 */
import { BBox, Shape } from '@antv/g';
import * as _ from '@antv/util';
import { constraintsLib } from './constraints/index';
import ShapeNodes, { IShapeNode } from './node/shape-nodes';
import VariableNodes from './node/variable-node';
import { rulesLib } from './rules/index';

interface IConstraint {
  name: string;
  option?: any;
}

interface IRule {
  name: string;
  method?: (...args: any[]) => any;
  option?: any;
}

interface ResponsiveCfg {
  plot: any;
  region?: any;
  nodes: ShapeNodes | VariableNodes;
  constraints: IConstraint[];
  rules?: any;
  iterationTime?: number;
  onStart?: (...args: any[]) => any;
  onIteration?: (...args: any[]) => any;
  onEnd?: (...args: any[]) => any;
  cfg?: { [key: string]: any };
}

export default class Responsive {
  public plot: any;
  public region: BBox;
  public nodes: ShapeNodes | VariableNodes;
  public constraints: any[];
  public rules: any[];
  public iterationTime: number = 10;
  public iterationIndex: number = 0;
  public rulesLocker: any[] = [];
  public currentConstraint: IConstraint;
  public constraintIndex: number = 0;
  public onStart: (nodes: ShapeNodes | VariableNodes) => void;
  public onIteration: (nodes: ShapeNodes | VariableNodes) => void;
  public onEnd: (nodes: ShapeNodes | VariableNodes) => void;

  constructor(cfg: ResponsiveCfg) {
    _.assign(this, cfg);
    this.currentConstraint = this.constraints[0];
    if (this.rules) {
      this.iterationTime = this.rules[this.currentConstraint.name].length;
    }
    this._start();
    this._run();
    this._end();
  }

  private _start() {
    if (this.onStart) {
      this.onStart(this.nodes);
    }
  }

  private _iteration() {
    let nodes;
    if (this.nodes.type === 'shape') {
      nodes = this.nodes as ShapeNodes;
    } else {
      nodes = this.nodes as VariableNodes;
    }
    if (nodes.type === 'shape') {
      nodes.measureNodes();
    }
    if (this.rules) {
      this._applyRules();
    }
    if (nodes.type === 'shape') {
      nodes.measureNodes();
    }
    if (this.onIteration) {
      this.onIteration(this.nodes);
    }
  }

  private _end() {
    if (this.onEnd) {
      this.onEnd(this.nodes);
    }
  }

  private _run() {
    let constraintPassed = this._constraintsTest();
    while (!constraintPassed) {
      if (this.iterationIndex > this.iterationTime - 1) {
        break;
      }
      this._iteration();
      constraintPassed = this._constraintsTest();
      this.iterationIndex++;
    }
    if (this.constraintIndex < this.constraints.length - 1) {
      this.constraintIndex++;
      this.currentConstraint = this.constraints[this.constraintIndex];
      this.iterationTime = this.rules ? this.rules[this.currentConstraint.name].length : 1;
      this.iterationIndex = 0;
      this._run();
    }
  }

  private _constraintsTest(): boolean {
    const constraint = constraintsLib[this.currentConstraint.name];
    const constraintOption = this.currentConstraint.option;
    if (constraint.usage === 'compare') {
      return this._constraintCompare(constraint, constraintOption);
    }
    return this._constraintAssignment(constraint, constraintOption);
  }

  private _constraintCompare(constraint, option) {
    const { type, expression } = constraint;
    const nodes = this.nodes.nodes;
    if (type === 'chain') {
      return this._chainConstraintCompare(expression, nodes, option);
    }
    if (type === 'padding') {
      return this._paddingConstraintCompare(expression, this.region, nodes, option);
    }
    if (type === 'group') {
      return this._groupConstraintCompare(expression, nodes, option);
    }
  }

  private _chainConstraintCompare(expression, nodes, option) {
    for (let i = 0; i < nodes.length - 1; i++) {
      const a = nodes[i];
      const b = nodes[i + 1];
      if (expression(a, b, option) === false) {
        return false;
      }
    }
    return true;
  }

  private _paddingConstraintCompare(expression, region, nodes, option) {
    if (region) {
      for (const node of nodes) {
        if (expression(node, region, option) === false) {
          return false;
        }
      }
    }
    return true;
  }

  private _groupConstraintCompare(expression, nodes, option) {
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = 0; j < nodes.length; j++) {
        if (j !== i) {
          const b = nodes[j];
          if (expression(a, b, option) === false) {
            return false;
          }
        }
      }
    }
    return true;
  }

  private _constraintAssignment(constraint, option) {
    const { type, expression } = constraint;
    const nodes = this.nodes.nodes;
    if (type === 'chain') {
      return this._chainConstraintAssign(expression, nodes, option);
    }
    if (type === 'padding') {
      return this._paddingConstraintAssign(expression, this.region, nodes, option);
    }
  }

  private _chainConstraintAssign(expression, nodes, option) {
    return true;
  }

  private _paddingConstraintAssign(expression, region, nodes, option) {
    if (region) {
      for (const node of nodes) {
        const value = expression(node, region, option);
        node.value = value;
      }
    }
    return true;
  }

  private _applyRules() {
    const ruleCfg = this.rules[this.currentConstraint.name][this.iterationIndex];
    // if (this.rulesLocker.indexOf(ruleCfg) < 0) {
    const rule = rulesLib[ruleCfg.name];
    const option = ruleCfg.option ? ruleCfg.option : {};
    const nodes = this.nodes.nodes as IShapeNode[];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      /** apply rule上下文 */
      this._applyRule(node.shape, rule, option, i);
    }
    // this.rulesLocker.push(ruleCfg);
    // }
  }

  private _applyRule(shape: Shape, rule, option, index) {
    const cfg = {
      nodes: this.nodes,
      region: this.region,
      plot: this.plot,
    };
    // rule(shape, option, index, this);
    rule(shape, option, index, cfg);
  }
}
