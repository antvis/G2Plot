import { Options as CanvasPlotOptions } from './canvas';

export interface PixelPlotOptions extends CanvasPlotOptions {
  /** x 轴字段 */
  xField?: string;
  /** y 轴字段 */
  yField?: string;
  /** 分组字段 */
  seriesField?: string;
  /** 是否堆积 */
  isStack?: boolean;
  /** 折线图形样式 */
  lineStyle?: StyleAttr;
  /** meta数据预处理 */
  meta?: Record<string, Meta>;
}
/** 数据字段比例尺 */
type Meta = {
  /** 比例尺的类型：'cat' | 'timeCat' | 'linear' | 'time' */
  type: string;
  /** 定义域的最小值，d3为domain，gplot2为limits，分类型下无效 */
  min?: any;
  /** 定义域的最大值，分类型下无效 */
  max?: any;
  /** 定义域 */
  values?: any[];
  /** 值域 */
  range?: number[]; // 默认[0, 1] 范围
  /** 自动调整min、max */
  nice?: boolean;
};
/** 一条数据记录 */
export type Datum = Record<string, any>;

type StyleAttr = ShapeStyle | ((datum: Datum) => ShapeStyle);

type ShapeStyle = {
  /** 描边颜色 */
  stroke?: string;
  /** 描边透明度 */
  strokeOpacity?: number;
  /** 填充颜色 */
  fill?: string;
  /** 填充透明度 */
  fillOpacity?: number;
  /** 整体透明度 */
  opacity?: number;
  /** 线宽 */
  lineWidth?: number;
  // 是否虚线，待讨论
  lineDash?: number[];
};
