import * as _ from '@antv/util';
import ApplyResponsiveLabel from '../../../util/responsive/apply/label';

class ApplyResponsiveLineLabel extends ApplyResponsiveLabel {

  protected getType(){
    const props = this.plot._initialProps;
    if(props.label && props.label.type){
      return props.label.type;
    }
    return 'point';
  }

}

export default function responsivePointLabel(plot) {
  const responsiveTheme = plot.themeController.responsiveTheme;
  const applyResponsiveLineLabel = new ApplyResponsiveLineLabel({
    plot,
    responsiveTheme
  });  
}