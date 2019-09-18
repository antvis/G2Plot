import * as _ from '@antv/util';
import Responsive from '../../../util/responsive/responsive';
import ShapeNodes from '../../../util/responsive/shapeNodes';

const SCALE_MAPPER = {
  cat:'category',
  timeCat: 'category',
  time: 'dateTime',
  linear: 'linear'
};

export default function responsiveAxis(plot) {
  const responsiveTheme = plot.themeController.responsiveTheme;
  if(!responsiveTheme.axis){
    return;
  }
  const canvas = plot.canvasController.canvas;

  // x-axis
  const x_resonsiveType = getAxisRresponsiveType(plot,'x');
  if(responsiveTheme.axis.x && x_resonsiveType){
    responsiveXAxis(plot, responsiveTheme, x_resonsiveType);
  }
  // y-axis
  const y_responsiveType = getAxisRresponsiveType(plot,'y');
  if(responsiveTheme.axis.y && y_responsiveType){
    responsiveYaxis(plot, responsiveTheme, y_responsiveType);
  }

  canvas.draw();
}

function responsiveXAxis(plot, responsiveTheme, responsiveType) {
  const axis = plot.plot.get('axisController').axes[0];
  const rawLabels = axis.get('labelRenderer').get('group').get('children');
  const shapes = [];
  for (let i = 0; i < rawLabels.length - 1; i++) {
    shapes.push(rawLabels[i]);
  }
  const shapeNodes = new ShapeNodes({
    shapes,
  });
  const { constraints, rules } = responsiveTheme.axis.x[responsiveType];
  new Responsive({
    nodes: shapeNodes,
    constraints,
    region: plot.plot.get('panelRange'),
    rules,
    plot,
    onEnd: (nodes) => {
      if (axis.get('tickLine')) {
        updateTicks(nodes, axis);
      }
    },
  });
}

function responsiveYaxis(plot, responsiveTheme, responsiveType) {
  const axis = plot.plot.get('axisController').axes[1];
  const rawLabels = axis.get('labelRenderer').get('group').get('children');
  const shapes = [];
  for (let i = 0; i < rawLabels.length - 1; i++) {
    shapes.push(rawLabels[i]);
  }
  const shapeNodes = new ShapeNodes({
    shapes,
  });
  const { constraints, rules } = responsiveTheme.axis.y[responsiveType];
  new Responsive({
    nodes: shapeNodes,
    constraints,
    rules,
    plot,
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

function getAxisRresponsiveType(plot,dim){
  const props = plot._initialProps;
  const axis = `${dim}Axis`;
  const field = `${dim}Field`;
  if(props[axis] && props[axis].type && props[axis].type === 'dateTime'){
    return 'dateTime';
  }
  const scaleType = plot.plot.get('scales')[props[field]].type;
  return SCALE_MAPPER[scaleType];
}