import { Axis } from '../../../dependents';
import { each, clone } from '@antv/util';
import ShapeNodes from '../node/shape-nodes';
import Responsive from '../responsive';
import ApplyResponsive from './base';

const SCALE_MAPPER = {
  cat: 'category',
  timeCat: 'category',
  time: 'dateTime',
  linear: 'linear',
};

function updateTicks(nodes) {
  const rawLabels = this.plot.view.backgroundGroup.findAll((el) => {
    const name = el.get('name');
    console.log(name);
  });
  /*let tickShape = null;
  axis
    .get('group')
    .get('children')
    .forEach((shape) => {
      if (shape.name === 'axis-ticks') {
        tickShape = shape;
        return false;
      }
    });
  const ticks = axis.get('ticks');
  const tickItems = axis.get('tickItems');
  const tickTexts = [];
  each(ticks, (tick) => {
    const t = tick as any;
    tickTexts.push(t.text);
  });
  let pathes = [];
  each(nodes.nodes, (node) => {
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

  tickShape.attr('path', pathes);*/
}

export default class ApplyResponsiveAxis extends ApplyResponsive {
  private dim: string;
  private axisInstance: Axis.Base;

  protected init() {
    this.axisInstance = this.getAxisInstance();
    super.init();
  }

  protected shouldApply() {
    const { options } = this.plot;
    if (!this.responsiveTheme.axis) {
      return false;
    }
    if (
      this.responsiveTheme.axis[this.dim] &&
      options[`${this.dim}Axis`].visible &&
      options[`${this.dim}Axis`].label &&
      options[`${this.dim}Axis`].label.visible
    ) {
      return true;
    }
    return false;
  }

  protected apply() {
    const rawLabels = this.plot.view.backgroundGroup.findAll((el) => {
      const name = el.get('name');
      if (name === 'axis-label') {
        const field = el.get('delegateObject').axis.get('field');
        if (field === this.plot.options[`${this.dim}Field`]) {
          return el;
        }
      }
    });
    const shapes = [];
    for (let i = 0; i < rawLabels.length; i++) {
      shapes.push(rawLabels[i]);
    }
    const shapeNodes = new ShapeNodes({
      shapes,
    });
    const { constraints, rules } = this.responsiveTheme.axis.x[this.type];
    new Responsive({
      nodes: shapeNodes,
      constraints,
      region: this.plot.getViewRange(),
      rules,
      plot: this.plot,
      onEnd: (nodes) => {
        this.updateTicks(nodes.origion_nodes);
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
    const scaleType = this.plot.view.getScaleByField([props[field]]).type;
    return SCALE_MAPPER[scaleType];
  }

  private getAxisInstance() {
    const axisIndex = this.dim === 'x' ? 0 : 1;
    const axis = this.plot.view.getController('axis').getComponents()[axisIndex].component;
    return axis;
  }

  private updateTicks(nodes) {
    const tickLineContainer = this.plot.view.backgroundGroup.findAll((el) => {
      const name = el.get('name');
      if (name === 'axis-tickline-group') {
        const field = el.get('delegateObject').axis.get('field');
        if (field === this.plot.options[`${this.dim}Field`]) {
          return el;
        }
      }
    })[0];
    if (tickLineContainer) {
      const tickShapes = tickLineContainer.get('children');
      each(nodes, (n, index) => {
        if (n.shape.attr('text') === '') {
          tickShapes[index].attr('opacity', 0);
        }
      });
    }
    this.plot.canvas.draw();
  }
}
