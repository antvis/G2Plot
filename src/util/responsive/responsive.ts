/** 可插拔的responsive模块 */
import ShapeNodes, { IShapeNode } from './shapeNodes';
import VariableNodes from './variableNode';
import { constraintsLib } from '../responsive/constraints';
import { rulesLib } from '../responsive/rules';
import * as _ from '@antv/util';
import { BBox, Shape } from '@antv/g';


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
  region? : any;
  nodes: ShapeNodes | VariableNodes;
  constraints: any[];
  rules?: any;
  iterationTime?: number;
  onStart?: Function;
  onIteration?: Function;
  onEnd?: Function;
  cfg?: {};
}

export default class Responsive {
  region: BBox;
  nodes: ShapeNodes | VariableNodes;
  constraints: any[];
  rules: any[];
  iterationTime: number = 10;
  iterationIndex: number = 0;
  rulesLocker: any[] = [];
  currentConstraint: string;
  constraintIndex: number = 0;
  onStart: Function;
  onIteration: Function;
  onEnd: Function;

  constructor(cfg: ResponsiveCfg) {
    _.assign(this, cfg);
    this.currentConstraint = this.constraints[0];
    if (this.rules) {
      this.iterationTime = this.rules[this.currentConstraint].length;
    }
    this._start();
    this._run();
    this._end();
  }

  private _start() {
    this.onStart && this.onStart(this.nodes);
  }

  private _iteration() {
    let nodes;
    if(this.nodes.type === 'shape'){
      nodes = this.nodes as ShapeNodes;
    }else{
      nodes = this.nodes as VariableNodes;
    }
    nodes.type === 'shape' && nodes.measureNodes();
    if (this.rules) this._applyRules();
    nodes.type === 'shape' && nodes.measureNodes();
    this.onIteration && this.onIteration(this.nodes);
  }


  private _end() {
    this.onEnd && this.onEnd(this.nodes);
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
      this.constraintIndex ++;
      this.currentConstraint = this.constraints[this.constraintIndex];
      this.iterationTime = this.rules ? this.rules[this.currentConstraint].length : 1;
      this.iterationIndex = 0;
      this._run();
    }
  }

  private _constraintsTest():Boolean {
    const constraint = constraintsLib[this.currentConstraint];
    if(constraint.usage === 'compare') {
      return this._constraintCompare(constraint);
    }else{
      return this._constraintAssignment(constraint);
    }
  }

  private _constraintCompare(constraint){
    const { type, expression } = constraint;
    const nodes = this.nodes.nodes;
    if (type === 'chain') return this._chainConstraintCompare(expression, nodes);
    if (type === 'padding') return this._paddingConstraintCompare(expression, this.region, nodes);
  }

  private _chainConstraintCompare(expression, nodes) {
    for (let i = 0; i < nodes.length - 1; i++) {
      const a = nodes[i];
      const b = nodes[i + 1];
      if (expression(a, b) === false) {
        return false;
      }
    }
    return true;
  }

  private _paddingConstraintCompare(expression, region, nodes) {
    if (region) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (expression(node, region) ===  false) {
          return false;
        }
      }
    }
    return true;
  }

  private _groupConstraintCompare(expression,nodes){
    for(let i = 0; i< nodes.length; i++){
      const a = nodes[i];
      for(let j = 0; j< nodes.length; j++){
        if(j!==i){
          const b = nodes[j];
          if(expression(a,b) === false){
            return false;
          }
        }
      }
    }
    return true;
  }

  private _constraintAssignment(constraint){
    const { type, expression } = constraint;
    const nodes = this.nodes.nodes;
    if (type === 'chain') return this._chainConstraintAssign(expression, nodes);
    if (type === 'padding') return this._paddingConstraintAssign(expression, this.region, nodes);
  }

  private _chainConstraintAssign(expression,nodes){
    return true;
  }

  private _paddingConstraintAssign(expression, region, nodes){
    if(region){
      for(let i=0; i<nodes.length; i++){
        const node = nodes[i];
        const value = expression(node,region);
        node.value = value;
      }
    }
    return true;
  }

  private _applyRules() {
    const ruleCfg = this.rules[this.currentConstraint][this.iterationIndex];
    if (this.rulesLocker.indexOf(ruleCfg) < 0) {
      const rule = rulesLib[ruleCfg.name];
      const options = ruleCfg.options ? ruleCfg.options :{};
      const nodes = this.nodes.nodes as IShapeNode[];
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        /** apply rule上下文 */
        this._applyRule(node.shape, rule, options, i);
      }
      this.rulesLocker.push(ruleCfg);
    }
  }

  private _applyRule(shape:Shape, rule, options, index) {
    rule(shape, options, index, this);
  }


}
