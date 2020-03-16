import { isKeep, NodesResamplingCfg } from './nodes-resampling';
import textHide from './text-hide';

export default function nodesResamplingByAbbrevate(shape, option: NodesResamplingCfg, index, cfg) {
  const nodes = cfg.nodes.nodes;
  if (isKeep(option.keep, index, nodes)) {
    return;
  }
  {
    const currentText = shape.attr('text');
    const originText = shape.get('delegateObject').item.name;
    if (currentText !== originText) {
      textHide(shape);
    }
  }
}
