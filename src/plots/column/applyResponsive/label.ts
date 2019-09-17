import * as _ from '@antv/util';
// import responsiveTheme from '../../../theme/responsive';
import Responsive from '../../../util/responsive/responsive';
import ShapeNodes from '../../../util/responsive/shapeNodes';

export default function responsiveLabel(plot) {
  const responsiveTheme = plot.themeController.responsiveTheme;
  /** 判断是否应用响应式规则 */
  if (isTopLabel(plot)) {
    const element = plot.plot.get('elements')[0];
    const labelShapes = element.get('labels');
    const nodes = new ShapeNodes({
      shapes: labelShapes,
    });
    const region = plot.plot.get('panelRange');
    const { constraints, rules } = responsiveTheme.label;
    new Responsive({
      nodes,
      constraints,
      rules,
      region,
      plot,
    });
  }
}

function isTopLabel(plot) {
  if (plot.column.label) {
    if (!plot.column.label.position || plot.column.label.position === 'top') {
      return true;
    }
  }
  return false;
}
