export type Tooltip = {
  /** 是否展示 */
  visible?: boolean;

  /** 设置 tooltip 内容字段，默认为[ xField, yField, colorField] */
  fields?: string[];

  /** 是否跟随 */
  shared?: boolean;

  /** 是否 title */
  showTitle?: boolean;

  /** 是否展示 */
  titleField?: string;

  /** 是否展示十字辅助线 */
  showCrosshairs?: boolean;

  /** 十字辅助线 */
  crosshairs?: object;

  /** 距离鼠标位置偏移值 */
  offset?: number;

  /** 是否展示 markers */
  showMarkers?: boolean;

  /** 配置 tooltip 样式 */
  domStyles?: {
    'g2-tooltip'?: any;
    'g2-tooltip-title'?: any;
    'g2-tooltip-list'?: any;
    'g2-tooltip-marker'?: any;
    'g2-tooltip-value'?: any;
  };

  /** 是否展示 */
  follow?: boolean;

  /** 自定义 */
  htmlContent?: (...args: any[]) => string;
};
