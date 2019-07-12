import Nodes from '../../../util/responsive/nodes';
import Responsive from '../../../util/responsive/responsive';
import responsiveTheme from '../../../theme/responsive';

export default function responsiveAxis(plot) {
  const props = plot._initialProps;
  const canvas = plot.canvasCfg.canvas;
    // x-axis
  responsiveXAxis(plot, props);
  canvas.draw();
}

function responsiveXAxis(plot, props) {
  const rawLabels = plot.plot.get('axisController').axes[0].get('group').get('children')[1].get('children');
  const shapes = [];
  for (let i = 0; i < rawLabels.length - 1; i++) {
    shapes.push(rawLabels[i]);
  }
  const nodes = new Nodes({
    shapes,
  });
  const responsiveCon = props.xAxis.type && props.xAxis.type === 'dateTime';
  const responsiveType = responsiveCon ? 'dateTime' : 'linear';
  const { constraints, rules } = responsiveTheme.axis.x[responsiveType].label;
  new Responsive({
    nodes,
    constraints,
    rules,
  });
}
