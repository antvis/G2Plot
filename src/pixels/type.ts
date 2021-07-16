import { Axis } from '../types/axis';
import { Tooltip } from '../types/tooltip';

export type Options = {
  /** 容器 宽度 */
  width: number;
  /** 容器 高度 */
  height: number;
  /** 容器 内边距 */
  padding?: number | number[]; // 暂时不处理 auto
  /** 原始数据 */
  rawData: Record<string, any>[];
  /** 像素数据，后期内置 */
  pixelData: number[];
  /** meta数据预处理 */
  meta?: Record<string, Meta>;
  /** xAxis 的配置项 */
  xAxis?: Axis;
  /** yAxis 的配置项 */
  yAxis?: Axis;
  /** tooltip 的配置项 */
  tooltip?: Tooltip;
};

export interface PixelPlotOptions extends Options {
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
}

/** 数据字段比例尺 */
export type Meta = {
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

/** 轴的四个方向 */
export enum DIRECTION {
  BOTTOM = 'bottom',
  LEFT = 'left',
  TOP = 'top',
  RIGHT = 'right',
}

/** 像素图 PixelBBox */
export type BBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};
