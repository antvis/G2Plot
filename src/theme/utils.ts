import * as _ from '@antv/util';

/**
 * mutable 的方式修改 axis 配置
 * @param axis
 */
// function convertToG2Axis(axis: any): void {
//   if (axis.line && axis.line.style) {
//     const lineStyle = axis.line.style;
//     delete axis.line.style;
//     _.mix(axis.line, lineStyle);
//   }
//   if (axis.tickLine) {
//     const tickLineStyle = axis.tickLine.style;
//     delete axis.tickLine.style;
//     _.mix(axis.tickLine, tickLineStyle);
//   }
//   if (axis.grid) {
//     const gridStyle = axis.grid.style;
//     delete axis.grid.style;
//     _.mix(axis.grid, gridStyle);
//   }
//   if (axis.label) {
//     if (axis.label.style) {
//       axis.label.textStyle = axis.label.style;
//       delete axis.label.style;
//     }
//   }
//   if (axis.title) {
//     if (axis.title.style) {
//       axis.title.textStyle = axis.title.style;
//       delete axis.title.style;
//     }
//   }
// }

/**
 * 将图形主题转换成 g2 theme 格式
 * @param plotTheme
 */
export function convertToG2Theme(plotTheme: any): any {
  const g2Theme = _.clone(plotTheme);
  /** tempo: legend margin设置为0 */
  if (!g2Theme.legend) {
    g2Theme.legend = {};
  }
  // g2Theme.legend.margin = [0, 0, 0, 0];
  // if (g2Theme.axis) {
  //   if (g2Theme.axis.x) {
  //     convertToG2Axis(g2Theme.axis.x);
  //     g2Theme.axis.bottom = {};
  //     _.deepMix(g2Theme.axis.bottom, g2Theme.axis.x, { position: 'bottom' });
  //     g2Theme.axis.top = {};
  //     _.deepMix(g2Theme.axis.top, g2Theme.axis.x, { position: 'top' });
  //     delete g2Theme.axis.x;
  //   }
  //   if (g2Theme.axis.y) {
  //     convertToG2Axis(g2Theme.axis.y);
  //     g2Theme.axis.left = {};
  //     _.deepMix(g2Theme.axis.left, g2Theme.axis.y, { position: 'left' });
  //     g2Theme.axis.right = {};
  //     _.deepMix(g2Theme.axis.right, g2Theme.axis.y, { position: 'right' });
  //     delete g2Theme.axis.y;
  //   }
  // }
  return g2Theme;
}
