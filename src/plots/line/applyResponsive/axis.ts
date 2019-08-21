import * as _ from '@antv/util';
import responsiveTheme from '../../../theme/responsive';
import Responsive from '../../../util/responsive/responsive';
import ShapeNodes from '../../../util/responsive/shapeNodes';

export default function responsiveAxis(plot) {
  const props = plot._initialProps;
  const canvas = plot.canvasController.canvas;
  // x-axis
  responsiveXAxis(plot, props);
  // y-axis
  responsiveYaxis(plot, props);
  canvas.draw();
}

function responsiveXAxis(plot, props) {
  const axis = plot.plot.get('axisController').axes[0];
  const rawLabels = axis
    .get('group')
    .get('children')[1]
    .get('children');
  const shapes = [];
  for (let i = 0; i < rawLabels.length - 1; i++) {
    shapes.push(rawLabels[i]);
  }
  const shapeNodes = new ShapeNodes({
    shapes,
  });
  const responsiveCon = props.xAxis.type && props.xAxis.type === 'dateTime';
  const responsiveType = responsiveCon ? 'dateTime' : 'linear';
  const { constraints, rules } = responsiveTheme.axis.x[responsiveType].label;
  new Responsive({
    nodes: shapeNodes,
    constraints,
    rules,
    onEnd: (nodes) => {
      if (axis.get('tickLine')) {
        updateTicks(nodes, axis);
      }
    },
  });
}

function responsiveYaxis(plot, props) {
  const axis = plot.plot.get('axisController').axes[1];
  const rawLabels = axis
    .get('group')
    .get('children')[2]
    .get('children');
  const shapes = [];
  for (let i = 0; i < rawLabels.length - 1; i++) {
    shapes.push(rawLabels[i]);
  }
  const shapeNodes = new ShapeNodes({
    shapes,
  });
  const { constraints, rules } = responsiveTheme.axis.y.linear.label;
  new Responsive({
    nodes: shapeNodes,
    constraints,
    rules,
    onEnd: (nodes) => {
      if (axis.get('tickLine')) {
        updateTicks(nodes, axis);
      }
    },
  });
}

function updateTicks(nodes, axis) {
  const tickShape = axis.get('group').get('children')[0];
  const ticks = axis.get('ticks');
  const tickItems = axis.get('tickItems');
  const tickTexts = [];
  _.each(ticks, (tick) => {
    const t = tick as any;
    tickTexts.push(t.text);
  });
  let pathes = [];
  _.each(nodes.nodes, (node) => {
    const n = node as any;
    if (n.width > 0 && n.height > 0) {
      const text = n.shape.get('origin').text;
      const index = tickTexts.indexOf(text);
      const tickItem = tickItems[index];
      pathes.push(['M', tickItem.x1, tickItem.y1], ['L', tickItem.x2, tickItem.y2]);
    }
  });

  if (pathes.length === 0) {
    pathes = [['M', 0, 0]];
  }

  tickShape.attr('path', pathes);
}
