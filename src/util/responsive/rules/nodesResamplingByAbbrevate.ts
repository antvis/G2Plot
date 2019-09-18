import { isKeep, NodesResamplingCfg } from './nodesResampling';
import textHide from './textHide';

export default function nodesResamplingByAbbrevate(shape, option: NodesResamplingCfg, index, cfg) {
  const nodes = cfg.nodes.nodes;
  if (isKeep(option.keep, index, nodes)) {
    return;
  }
  {
    const currentText = shape.attr('text');
    const originText = shape.get('origin').text;
    if (currentText !== originText) {
      textHide(shape);
    }
  }
}
