/** G shape style 配置, 按道理应该从 G 中引入 */
export type ShapeStyle = Readonly<{
  readonly fill?: string;
  readonly stroke?: string;
  readonly lineWidth?: number;
  readonly lineDash?: number[];
  readonly opacity?: number;
  readonly fillOpacity?: number;
  readonly strokeOpacity?: number;
}>;
