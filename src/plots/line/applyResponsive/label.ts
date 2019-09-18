import * as _ from '@antv/util';
import Responsive from '../../../util/responsive/responsive';
import ShapeNodes from '../../../util/responsive/shapeNodes';

export default function responsivePointLabel(plot) {
  const responsiveTheme = plot.themeController.responsiveTheme;
  if(!responsiveTheme.label){
    return;
  }
  const labelType = getLabelType(plot);
  if(responsiveTheme.label[labelType]){
        const labelShapes = plot.plot.get('elements')[0].get('labels');
        const nodes = new ShapeNodes({
      shapes: labelShapes,
    });
    const { constraints, rules } = responsiveTheme.label[labelType];
    new Responsive({
      nodes,
      constraints,
      rules,
      plot,
      region: plot.plot.get('viewRange'),
    });
  }
}

function getLabelType(plot){
  const props = plot._initialProps;
  if(props.label && props.label.type){
    return props.label.type;
  }
  return 'point';
}