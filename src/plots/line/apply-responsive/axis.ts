import ApplyResponsiveAxis from '../../../util/responsive/apply/axis';
import LineLayer from '../layer';

export default function responsiveAxis(layer: LineLayer) {
  const responsiveTheme = layer.getResponsiveTheme();
  const canvas = layer.canvas;
  // x-axis
  new ApplyResponsiveAxis({
    plot: layer,
    responsiveTheme,
    dim: 'x',
  });
  // y-axis
  new ApplyResponsiveAxis({
    plot: layer,
    responsiveTheme,
    dim: 'y',
  });

  canvas.draw();
}
