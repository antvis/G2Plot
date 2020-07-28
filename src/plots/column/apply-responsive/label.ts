import { get } from '@antv/util';
import ApplyResponsiveLabel from '../../../util/responsive/apply/label';
import ColumnLayer from '../layer';

class ApplyResponsiveColumnLabel extends ApplyResponsiveLabel {
  protected getType() {
    return get(this.plot.options, ['label', 'position'], 'inner');
  }
}

export default function responsivePointLabel(layer: ColumnLayer) {
  const responsiveTheme = layer.getResponsiveTheme();
  new ApplyResponsiveColumnLabel({
    plot: layer,
    responsiveTheme,
  });
}
