import * as _ from '@antv/util';
import Responsive from '../../../util/responsive/responsive';
import ShapeNodes from '../../../util/responsive/shapeNodes';

export default function responsiveLabel(plot) {
  const responsiveTheme = plot.themeController.responsiveTheme;
  if(!responsiveTheme.label){
    return;
  }
  const labelResponsiveType = getLabelResponsiveType(plot);

  if (responsiveTheme.label[labelResponsiveType]) {
    const element = plot.plot.get('elements')[0];
    const labelShapes = element.get('labels');
    const nodes = new ShapeNodes({
      shapes: labelShapes,
    });
    const region = plot.plot.get('panelRange');
    const { constraints, rules } = responsiveTheme.label[labelResponsiveType];
    new Responsive({
      nodes,
      constraints,
      rules,
      region,
      plot,
    });
  }
}

function getLabelResponsiveType(plot){
  if (plot.column.label) {
    if (!plot.column.label.position || plot.column.label.position === 'top') {
      return 'top';
    }
  }

  return 'inner';
}