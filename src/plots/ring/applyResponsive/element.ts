import Responsive from '../../../util/responsive/responsive';
import responsiveTheme from '../../../theme/responsive';
import VariableNodes from '../../../util/responsive/variableNode';
import { getCoord } from '@antv/coord';

export default function responsiveRing(plot) {
  const props = plot._initialProps;
  const padding = props.padding;
  const radius = props.radius ? props.radius :  1;
    /** 创建坐标系 */
  const polar = getCoord('polar');
  const coord = new polar({
    radius,
    start: { x:padding[3], y:padding[0] },
    end: { x: props.width - padding[1], y:props.height - padding[2] },
  });
  const region = {
    radius,
    coord,
  };
  const nodes = new VariableNodes({
    nodes: [ { name:'innerRadius', value:0 } ],
  });
  const { constraints } = responsiveTheme.element.ring;
  new Responsive({
    nodes,
    constraints,
    region,
    onEnd:() => {
      props.innerRadius = nodes.nodes[0].value;
    },
  });
}
