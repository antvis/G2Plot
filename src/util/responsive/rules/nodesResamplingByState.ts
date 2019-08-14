import { Shape } from '@antv/g';
import * as _ from '@antv/util';
import textHide from './textHide';

export default function nodesResamplingByState(shape: Shape, cfg, index, responsive) {
  const nodes = responsive.nodes.nodes;
  const current = nodes[index];
  current.line && current.line.remove();
  const { stateNodes } = responsive.cfg;
  let isState = false;
  _.each(stateNodes, (node) => {
      // @ts-ignore
    if (node.shape.get('origin') === current.shape.get('origin')) {
      isState = true;
    }
  });
  if (isState) {
    if (current.origin_position) {
      const { x, y } = current.origin_position;
      shape.attr('x', x);
      shape.attr('y', y);
    }
  }else {
    textHide(shape);
  }
}
