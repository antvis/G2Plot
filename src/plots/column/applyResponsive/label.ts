import * as _ from '@antv/util';
import ApplyResponsiveLabel from '../../../util/responsive/apply/label';

class ApplyResponsiveColumnLabel extends ApplyResponsiveLabel {

  protected getType(){
    if (this.plot.column.label) {
      if (!this.plot.column.label.position || this.plot.column.label.position === 'top') {
        return 'top';
      }
    }
    return 'inner';
  }
  
}

export default function responsivePointLabel(plot) {
  const responsiveTheme = plot.themeController.responsiveTheme;
  const applyResponsiveColumnLabel = new ApplyResponsiveColumnLabel({
    plot,
    responsiveTheme
  });  
}