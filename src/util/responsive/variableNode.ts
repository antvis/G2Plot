import * as _ from '@antv/util';

interface NodesCfg {
  nodes: IVariableNode[];
}

interface IVariableNode {
  name: string;
  value: any;
}

export default class VariableNodes {
  nodes: IVariableNode[];
  type: string = 'variable';
  constructor(cfg: NodesCfg) {
    _.assign(this, cfg);
  }
  public normalize() {

  }
}
