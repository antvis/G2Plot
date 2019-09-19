import * as _ from '@antv/util';
import ApplyResponsiveAxis from '../../../util/responsive/apply/axis';

export default function responsiveAxis(plot) {
  const responsiveTheme = plot.themeController.responsiveTheme;
  const canvas = plot.canvasController.canvas;
  // x-axis 
  const x_responsiveAxis = new ApplyResponsiveAxis({
    plot,
    responsiveTheme,
    dim: 'x'
  });
  // y-axis
  const y_responsiveAxis = new ApplyResponsiveAxis({
    plot,
    responsiveTheme,
    dim: 'y'
  });

  canvas.draw();
}
