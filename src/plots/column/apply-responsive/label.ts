import ApplyResponsiveLabel from '../../../util/responsive/apply/label';
import ColumnLayer from '../layer';

class ApplyResponsiveColumnLabel extends ApplyResponsiveLabel {
  protected getType() {
    if (this.plot.column.label) {
      if (!this.plot.column.label.position || this.plot.column.label.position === 'top') {
        return 'top';
      }
    }
    return 'inner';
  }
}

export default function responsivePointLabel(layer: ColumnLayer) {
  const responsiveTheme = layer.getResponsiveTheme();
  new ApplyResponsiveColumnLabel({
    plot: layer,
    responsiveTheme,
  });
}
