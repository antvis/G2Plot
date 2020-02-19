import ShapeNodes from '../node/shape-nodes';
import Responsive from '../responsive';
import ApplyResponsive from './base';

export default class ApplyResponsiveLabel extends ApplyResponsive {
  protected shouldApply() {
    if (!this.responsiveTheme.label || !this.responsiveTheme.label[this.type]) {
      return false;
    }
    return true;
  }

  protected apply() {
    const labelShapes = this.plot.view.get('elements')[0].get('labels');
    const nodes = new ShapeNodes({
      shapes: labelShapes,
    });
    const { constraints, rules } = this.responsiveTheme.label[this.type];
    new Responsive({
      nodes,
      constraints,
      rules,
      plot: this.plot,
      region: this.plot.view.get('viewRange'),
    });
  }

  protected getType() {
    return null;
  }
}
