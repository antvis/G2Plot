import { isKeep, NodesResamplingCfg } from './nodesResampling';
import textHide from './textHide';

export default function nodesResamplingByAbbrevate(shape, cfg: NodesResamplingCfg, index, responsive) {
  const nodes = responsive.nodes.nodes;
  if (isKeep(cfg.keep, index, nodes)) {
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
