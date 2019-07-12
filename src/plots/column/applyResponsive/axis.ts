import Nodes from '../../../util/responsive/nodes';
import Responsive from '../../../util/responsive/responsive';
import responsiveTheme from '../../../theme/responsive';

export default function responsiveAxis(plot) {
  const props = plot._initialProps;
  const canvas = plot.canvasCfg.canvas;
    // x-axis
  responsiveXAxis(plot, props);
    // y-axis
  responsiveYaxis(plot, props);
  canvas.draw();
}

function responsiveXAxis(plot, props) {
  const rawLabels = plot.plot.get('axisController').axes[0].get('labelRenderer').get('group').get('children');
  const shapes = [];
  for (let i = 0; i < rawLabels.length - 1; i++) {
    shapes.push(rawLabels[i]);
  }
  const nodes = new Nodes({
    shapes,
  });
  const { constraints, rules } = responsiveTheme.axis.x.category.label;
  new Responsive({
    nodes,
    constraints,
    rules,
  });
}

function responsiveYaxis(plot, props) {
  const rawLabels = plot.plot.get('axisController').axes[1].get('labelRenderer').get('group').get('children');
  const shapes = [];
  for (let i = 0; i < rawLabels.length - 1; i++) {
    shapes.push(rawLabels[i]);
  }
  const nodes = new Nodes({
    shapes,
  });
  const { constraints, rules } = responsiveTheme.axis.y.linear.label;
  new Responsive({
    nodes,
    constraints,
    rules,
  });
}
