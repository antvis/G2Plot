import ApplyResponsiveLabel from '../../../util/responsive/apply/label';
import LineLayer from '../layer';
import { get } from '@antv/util';

class ApplyResponsiveLineLabel extends ApplyResponsiveLabel {
  protected getType() {
    return get(this.plot.options, ['label', 'type'], 'point');
  }
}

export default function responsivePointLabel(layer: LineLayer) {
  const responsiveTheme = layer.getResponsiveTheme();
  new ApplyResponsiveLineLabel({
    plot: layer,
    responsiveTheme,
  });
}
