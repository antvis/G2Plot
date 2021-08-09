import { Scale, ScaleConfig } from '@antv/g2';
import { Axis } from '../types/axis';
import { Tooltip } from '../types/tooltip';

export type Options = {
  /** 容器 宽度 */
  width?: number;
  /** 容器 高度 */
  height?: number;
  /** 容器 自适应 */
  autoFit?: boolean;
  /** 容器 内边距 */
  padding?: number | number[]; // 暂时不处理 auto
  /** 原始数据 */
  rawData: Record<string, any>[];
  /** 像素数据，后期内置 */
  pixelData: number[];
  /** meta数据预处理 */
  meta?: Record<string, ScaleOption>;
  /** xAxis 的配置项 */
  xAxis?: Axis;
  /** yAxis 的配置项 */
  yAxis?: Axis;
  /** tooltip 的配置项 */
  tooltip?: Tooltip;
};

export interface PixelPlotOptions extends Options {
  /** x 轴字段 */
  xField: string;
  /** y 轴字段 */
  yField: string;
  /** 分组字段 */
  seriesField?: string;
  /** 是否堆积 */
  isStack?: boolean;
  /** 折线图形样式 */
  lineStyle?: StyleAttr;
  /** brushZoom */
  brushZoom?: Brush | false;
  /** brushFilter */
  brushFilter?: BrushFilter | false;
}

export type Brush = {
  type: string;
  enabled: boolean;
};

export type BrushFilter = Brush & {
  isKeepSelection: boolean;
};

/** 数据字段比例尺 */
export type ScaleOption = ScaleConfig & {
  /** 比例尺的类型：'cat' | 'timeCat' | 'linear' | 'time' 等，针对密度折线图，暂时 */
  type?: ScaleType;
};

export type ScaleType =
  | 'linear'
  | 'cat'
  | 'category'
  | 'identity'
  | 'log'
  | 'pow'
  | 'time'
  | 'timeCat'
  | 'quantize'
  | 'quantile';

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

/** 像素图 Region */
export type Region = {
  start: {
    x: number;
    y: number;
  };
  end: {
    x: number;
    y: number;
  };
};

/** 因为Scale和ScaleOption的接口信息不一致，融合起来 */
export type ScaleMeta = {
  scale: Scale;
  scaleOption: ScaleOption;
};

/** 点位置 */
export type Point = {
  x: number;
  y: number;
};
