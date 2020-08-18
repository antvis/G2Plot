/** G shape style 配置, 按道理应该从 G 中引入 */
export type ShapeStyle = Readonly<{
  fill?: string;
  stroke?: string;
  // 线相关样式
  lineWidth?: number;
  lineDash?: number[];
  lineJoin?: string;
  lineCap?: string;

  opacity?: number;
  fillOpacity?: number;
  strokeOpacity?: number;
  fontSize?: number;
  fontWeight?: number | string;
  textAlign?: string;
  verticalAlign?: string;
}>;
