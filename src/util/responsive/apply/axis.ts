import { Axis } from '../../../dependents';
import { each } from '@antv/util';
import ShapeNodes from '../node/shape-nodes';
import Responsive from '../responsive';
import ApplyResponsive from './base';

const SCALE_MAPPER = {
  cat: 'category',
  timeCat: 'category',
  time: 'dateTime',
  linear: 'linear',
};

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
    const components = this.plot.view.getController('axis')?.getComponents();
    if (components) {
      return components[axisIndex]?.component;
    }
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
