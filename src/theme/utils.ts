import { clone } from '@antv/util';

/**
 * mutable 的方式修改 axis 配置
 * @param axis
 */
// function convertToG2Axis(axis: any): void {
//   if (axis.line && axis.line.style) {
//     const lineStyle = axis.line.style;
//     delete axis.line.style;
//     mix(axis.line, lineStyle);
//   }
//   if (axis.tickLine) {
//     const tickLineStyle = axis.tickLine.style;
//     delete axis.tickLine.style;
//     mix(axis.tickLine, tickLineStyle);
//   }
//   if (axis.grid) {
//     const gridStyle = axis.grid.style;
//     delete axis.grid.style;
//     mix(axis.grid, gridStyle);
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
  const g2Theme = clone(plotTheme);
  /** tempo: legend margin设置为0 */
  if (!g2Theme.legend) {
    g2Theme.legend = {};
  }
  return g2Theme;
}
