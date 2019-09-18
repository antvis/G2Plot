import * as _ from '@antv/util';
import textHide from './textHide';

export interface NodesResamplingCfg {
  keep: string[];
}

export default function nodesResampling(shape, option: NodesResamplingCfg, index, cfg) {
  const nodes = cfg.nodes.nodes;
  /** nodeLength为偶数，则奇数index的shape保留，反之则偶数index的shape保留 */
  const oddKeep = nodes.length % 2 === 0 ? false : true;
  if (isKeep(option.keep, index, nodes)) {
    return;
  }
  {
    const isOdd = index % 2 === 0 ? true : false;
    if ((!oddKeep && isOdd) || (oddKeep && !isOdd)) {
      textHide(shape);
    }
  }
}

export function isKeep(keepCfg, index, nodes) {
  /** 允许设置start end 或任意index */
  const conditions = [];
  _.each(keepCfg, (cfg) => {
    if (cfg === 'start') {
      conditions.push(index === 0);
    } else if (cfg === 'end') {
      conditions.push(index === nodes.length - 1);
    } else if (_.isNumber(cfg)) {
      conditions.push(index === cfg);
    }
  });
  for (const condition of conditions) {
    if (condition === true) {
      return true;
    }
  }
  return false;
}
