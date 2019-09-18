import { getCoord } from '@antv/coord';
// import responsiveTheme from '../../../theme/responsive';
import Responsive from '../../../util/responsive/responsive';
import VariableNodes from '../../../util/responsive/variableNode';

export default function responsiveRing(plot) {
  const props = plot._initialProps;
  const responsiveTheme = plot.themeController.responsiveTheme;
  const padding = props.padding;
  const radius = props.radius ? props.radius : 1;
  const {width,height} = plot.canvasController;
  /** 创建坐标系 */
  const polar = getCoord('polar');
  const coord = new polar({
    radius,
    start: { x: padding[3], y: padding[0] },
    end: { x: width - padding[1], y: height - padding[2] },
  });
  const region = {
    radius,
    coord,
  };
  const nodes = new VariableNodes({
    nodes: [{ name: 'innerRadius', value: 0 }],
  });

  const { constraints } = responsiveTheme.ring;
  new Responsive({
    nodes,
    constraints,
    region,
    plot,
    onEnd: () => {
      props.innerRadius = nodes.nodes[0].value;
    },
  });
}
