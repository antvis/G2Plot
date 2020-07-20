/** G shape style 配置, 按道理应该从 G 中引入 */
export type ShapeStyle = Readonly<{
  fill?: string;
  stroke?: string;
  lineWidth?: number;
  lineDash?: number[];
  opacity?: number;
  fillOpacity?: number;
  strokeOpacity?: number;
  fontSize?: number;
  fontWeight?: number | string;
  textAlign?: string;
  vertialAlign?: string;
}>;
