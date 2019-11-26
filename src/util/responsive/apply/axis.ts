import { Axis } from '@antv/component';
import * as _ from '@antv/util';
import ShapeNodes from '../node/shape-nodes';
import Responsive from '../responsive';
import ApplyResponsive from './base';

const SCALE_MAPPER = {
  cat: 'category',
  timeCat: 'category',
  time: 'dateTime',
  linear: 'linear',
};

function updateTicks(nodes, axis) {
  let tickShape = null;
  axis.get('group').get('children').forEach(shape => {
    if (shape.name === 'axis-ticks') {
      tickShape = shape;
      return false;
    }
  });
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

export default class ApplyResponsiveAxis extends ApplyResponsive {
  private dim: string;
  private axisInstance: Axis.Base;

  protected init() {
    this.axisInstance = this.getAxisInstance();
    super.init();
  }

  protected shouldApply() {
    if (!this.responsiveTheme.axis) {
      return false;
    }

    if (this.responsiveTheme.axis[this.dim] && this.type && this.axisInstance) {
      return true;
    }
    return false;
  }

  protected apply() {
    const axisIndex = this.dim === 'x' ? 0 : 1;
    const axis = this.plot.view.get('axisController').axes[axisIndex];
    const rawLabels = axis
      .get('labelRenderer')
      .get('group')
      .get('children');
    const shapes = [];
    for (let i = 0; i < rawLabels.length - 1; i++) {
      shapes.push(rawLabels[i]);
    }
    const shapeNodes = new ShapeNodes({
      shapes,
    });
    const { constraints, rules } = this.responsiveTheme.axis.x[this.type];
    new Responsive({
      nodes: shapeNodes,
      constraints,
      region: this.plot.view.get('viewRange'),
      rules,
      plot: this.plot,
      onEnd: (nodes) => {
        if (axis.get('tickLine')) {
          updateTicks(nodes, axis);
        }
      },
    });
  }

  protected getType() {
    const props = this.plot.options;
    const axis = `${this.dim}Axis`;
    const field = `${this.dim}Field`;
    if (props[axis] && props[axis].type && props[axis].type === 'dateTime') {
      return 'dateTime';
    }
    const scaleType = this.plot.view.get('scales')[props[field]].type;
    return SCALE_MAPPER[scaleType];
  }

  private getAxisInstance() {
    const axisIndex = this.dim === 'x' ? 0 : 1;
    const axis = this.plot.view.get('axisController').axes[axisIndex];
    return axis;
  }
}
