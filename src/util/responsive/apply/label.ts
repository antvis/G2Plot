import ShapeNodes from '../node/shape-nodes';
import Responsive from '../responsive';
import ApplyResponsive from './base';
import { each } from '@antv/util';

export default class ApplyResponsiveLabel extends ApplyResponsive {
  protected shouldApply() {
    if (!this.responsiveTheme.label || !this.responsiveTheme.label[this.type]) {
      return false;
    }
    return true;
  }

  protected apply() {
    const labelShapesContainer = this.plot.view.geometries[0].labelsContainer.get('children');
    const labelShapes = [];
    each(labelShapesContainer, (c) => {
      labelShapes.push(c.get('children')[0]);
    });
    const nodes = new ShapeNodes({
      shapes: labelShapes,
    });
    const { constraints, rules } = this.responsiveTheme.label[this.type];
    new Responsive({
      nodes,
      constraints,
      rules,
      plot: this.plot,
      region: this.plot.view.coordinateBBox,
    });
  }

  protected getType() {
    return null;
  }
}
