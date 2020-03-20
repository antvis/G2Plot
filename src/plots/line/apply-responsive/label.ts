import ApplyResponsiveLabel from '../../../util/responsive/apply/label';
import LineLayer from '../layer';

class ApplyResponsiveLineLabel extends ApplyResponsiveLabel {
  protected getType() {
    const props = this.plot.options;
    if (props.label && props.label.type) {
      return props.label.type;
    }
    return 'point';
  }
}

export default function responsivePointLabel(layer: LineLayer) {
  const responsiveTheme = layer.getResponsiveTheme();
  new ApplyResponsiveLineLabel({
    plot: layer,
    responsiveTheme,
  });
}
