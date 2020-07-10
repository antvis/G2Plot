/**
 * G2-Plot配置项
 * 注意事项：
 * 1. 命名采用驼峰
 * 2. 如果是枚举值，不使用enum，全部列出
 * 3. 减少嵌套，尽量平铺配置
 */
import { ShapeAttrs } from '@antv/g-base';
import {
  Options,
  AttributeOption,
  AdjustOption,
  LabelOption,
  MappingDatum,
  Element,
  Datum,
  _ORIGIN,
} from '../dependents';
import { LooseMap, Maybe } from './types';

export interface Meta {
  alias?: string;
  formatter?: (v: any) => string;
  values?: string[];
  range?: number[];
  type?: 'linear' | 'time' | 'timeCat' | 'cat' | 'pow' | 'log';
}

export interface ITitle {
  visible: boolean;
  text: string;
  style?: TextStyle;
  alignTo?: 'left' | 'right' | 'middle';
}

export interface IDescription {
  visible: boolean;
  text: string;
  style?: TextStyle;
  alignTo?: 'left' | 'right' | 'middle';
}

type IEvents = LooseMap<string>;

export type Formatter = (text: string, item: any, idx: number) => string;

export interface IBaseAxis {
  /** 轴是否需要显示，默认true */
  visible?: boolean;
  /** 轴类型，对应scale类型 */
  type?: 'linear' | 'time' | 'timeCat' | 'cat' | 'pow' | 'log';
  /** scale 自定义 tickMethod */
  tickMethod?: string | ((cfg: any) => number[]);
  /** 轴位置，默认下和左 */
  line?: {
    visible?: boolean;
    style?: LineStyle;
  };
  grid?: {
    /** 网格线是否显示 */
    visible?: boolean;
    line?: {
      style?: LineStyle | ((text: string, idx: number, count: number) => LineStyle);
      type?: 'line' | 'circle';
    };
    /** 网格设置交替的颜色，指定一个值则先渲染偶数层，两个值则交替渲染 */
    alternateColor?: string | string[];
  };
  label?: {
    visible?: boolean;
    formatter?: (name: string, tick: any, index: number) => string;
    offset?: number; // 坐标轴文本距离坐标轴线的距离
    offsetX?: number; // 在 offset 的基础上，设置坐标轴文本在 x 方向上的偏移量
    offsetY?: number; // 在 offset 的基础上，设置坐标轴文本在 y 方向上的偏移量
    rotate?: number; // label 文本旋转的角度，使用角度制
    style?: TextStyle;
    autoRotate?: boolean;
    autoHide?: boolean | string; // 默认的 autoHide 策略，或指定自动隐藏策略
  };
  title?: {
    visible?: boolean;
    autoRotate?: boolean;
    text?: string;
    offset?: number;
    style?: TextStyle;
    spacing?: number;
  };
  tickLine?: {
    visible?: boolean;
    style?: LineStyle;
  };
}
/** Linear型 */
export interface IValueAxis extends IBaseAxis {
  type?: 'linear' | 'pow' | 'log';
  /** tick相关配置 */
  nice?: boolean;
  min?: number;
  max?: number;
  minLimit?: number;
  maxLimit?: number;
  tickCount?: number;
  tickInterval?: number;
  /** pow 指数 */
  exponent?: number;
  /** log 基数 */
  base?: number;
}
/** 时间型 */
export interface ITimeAxis extends IBaseAxis {
  type?: 'time';
  /** tick相关配置 */
  tickInterval?: string;
  tickCount?: number;
  mask?: string;
}
/** 离散类目型 */
export interface ICatAxis extends IBaseAxis {
  type?: 'cat';
}

export type Axis = ICatAxis | IValueAxis | ITimeAxis;

export interface Label {
  visible?: boolean;
  type?: string;
  formatter?: (
    text: Maybe<string | number>,
    item: {
      [_ORIGIN]: Datum;
      mappingDatum: MappingDatum;
      mappingDatumIndex: number;
      element: Element;
      elementIndex: number;
    },
    idx: number,
    ...extras: any[]
  ) => string;
  /** 精度配置，可通过自定义精度来固定数值类型 label 格式 */
  precision?: number;
  /** 添加后缀 */
  suffix?: string;
  style?: TextStyle;
  offset?: number | any;
  offsetX?: number;
  offsetY?: number;
  position?: string;
  adjustColor?: boolean;
  adjustPosition?: boolean;
  autoRotate?: boolean;
  // labelLine?: any;
  /** 标签对应字段 */
  field?: string;
}

export type LegendPosition =
  | 'left-top'
  | 'left-center'
  | 'left-bottom'
  | 'right-top'
  | 'right-center'
  | 'right-bottom'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

interface LegendMarkerStyle extends GraphicStyle {
  r?: number;
}

export interface Legend {
  visible?: boolean;
  /** 位置 */
  position?: LegendPosition;
  /** 翻页 */
  flipPage?: boolean;
  offsetX?: number;
  offsetY?: number;
  clickable?: boolean;
  title?: {
    visible?: boolean;
    text?: string;
    style?: TextStyle;
  };
  marker?: {
    symbol?: string;
    style: LegendMarkerStyle;
  };
  text?: {
    style?: TextStyle;
    formatter?: (text: string, cfg: any) => string;
  };
}

export interface Tooltip {
  visible?: boolean;
  fields?: string[];
  shared?: boolean;
  showTitle?: boolean;
  titleField?: string;
  formatter?: (...args: any) => { name: string; value: number };
  showCrosshairs?: boolean;
  crosshairs?: object;
  offset?: number;
  showMarkers?: boolean;
  domStyles?: {
    'g2-tooltip'?: any;
    'g2-tooltip-title'?: any;
    'g2-tooltip-list'?: any;
    'g2-tooltip-marker'?: any;
    'g2-tooltip-value'?: any;
  };
  follow?: boolean;
  custom?: {
    container?: string | HTMLElement;
    customContent?: (title: string, data: any[]) => string | void;
    onChange?: (tooltipDom: HTMLElement, cfg: CustomTooltipConfig) => void;
  };
}

export interface Animation {
  appear?: AnimationCfg;
  enter?: AnimationCfg;
  update?: AnimationCfg;
  leave?: AnimationCfg;
  [field: string]: any;
}

export interface AnimationCfg {
  /** 动画模式，延伸or缩放 */
  type?: string;
  duration?: number;
  easing?: string;
  delay?: number;
  callback?: (...args: any[]) => void;
  [field: string]: any;
}

// tslint:disable-next-line: no-empty-interface
export interface Theme {}

export interface ElementOption {
  type: string;
  position: {
    fields: string[];
  };
  color?: AttributeOption;
  size?: AttributeOption;
  shape?: AttributeOption;
  style?: GraphicStyle;
  label?: LabelOption | false;
  animate?: Animation;
  adjust?: AdjustOption[];
  connectNulls?: boolean;
  widthRatio?: {
    [type: string]: number;
  };
  tooltip?: any;
}

export type G2Config = Options;

export interface IColorConfig {
  fields?: string[];
  values?: string[];
  callback?: (...args: any[]) => any;
}

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = DAY * 365;
export const timeIntervals = {
  second: { value: SECOND, format: 'HH:mm:ss' },
  miniute: { value: MINUTE, format: 'HH:mm' },
  hour: { value: HOUR, format: 'HH' },
  day: { value: DAY, format: 'YYYY-MM-DD' },
  week: { value: WEEK, format: 'YYYY-MM-DD' },
  month: { value: MONTH, format: 'YYYY-MM' },
  year: { value: YEAR, format: 'YYYY' },
};

interface StateCondition {
  name: string;
  exp: () => boolean | string | number;
}

export interface StateConfig {
  condition: () => any | StateCondition;
  style?: GraphicStyle;
  related?: string[];
}

export interface GuideLineConfig {
  type?: string;
  start?: any[];
  end?: any[];
  lineStyle?: LineStyle;
  text?: {
    position?: 'start' | 'center' | 'end';
    content: string;
    offsetX?: number;
    offsetY: number;
    style?: TextStyle;
  };
}

export interface ISliderInteractionConfig {
  /** 在图表中的位置，默认 horizontal */
  /** @ignore */
  type?: 'horizontal' | 'vertical';
  /** 宽度，在 vertical 下生效 */
  /** @ignore */
  width?: number;
  /** 高度，在 horizontal 下生效 */
  height?: number;
  /** 可选 padding */
  padding?: [number, number, number, number];
  /** 默认开始位置, 0~1 */
  start?: number;
  /** 默认结束位置, 0~1 */
  end?: number;
  /** 背景框样式配置 */
  backgroundStyle?: ShapeAttrs;
  /** 前景框样式配置 */
  foregroundStyle?: ShapeAttrs;
  /** 滑块样式配置 */
  handlerStyle?: ShapeAttrs;
  /** 文本样式配置 */
  textStyle?: ShapeAttrs;
  /** slider 趋势图配置  */
  trendCfg?: {
    /** 是否使用 smooth 折线 */
    smooth?: boolean;
    /** 是否使用面积图 */
    isArea?: boolean;
    /** 背景样式配置 */
    backgroundStyle?: ShapeAttrs;
    /** 折线样式配置 */
    lineStyle?: ShapeAttrs;
    /** 面积图样式配置 */
    areaStyle?: ShapeAttrs;
  };
}

export interface IScrollbarInteractionConfig {
  /** 在图表中的位置，默认 horizontal */
  /** @ignore */
  type?: 'horizontal' | 'vertical';
  /** 宽度，在 vertical 下生效 */
  width?: number;
  /** 高度，在 horizontal 下生效 */
  height?: number;
  /** 可选 padding */
  padding?: [number, number, number, number];
  /** 对应水平滚动条，为X轴每个分类字段的宽度；对于垂直滚动条，为X轴每个分类字段的高度 */
  categorySize?: number;
}

export interface ITimeLineInteractionConfig {
  /** 绑定过滤字段，必须传 */
  field: string;
  /** 判定动画 key */
  key: string;
  /** 是否循环播放，默认 false */
  loop?: boolean;
  /** 是否自动播放，默认 true */
  auto?: boolean;
  /** 播放速度 */
  speed?: number;
  /** 高度，在 horizontal 下生效 */
  height?: number;
  /** 可选 padding */
  padding?: [number, number, number, number];
  /** 当前仅支持 horizontal，只放置在图表底部 */
  // type?: 'horizontal';
  /** 宽度，在 vertical 下生效 */
  // width?: number;
}

export interface ITooltipIndicatorInteractionConfig {
  /** 是否显示总计 */
  showTotal?: boolean;
  /** 是否显示百分比 */
  showPercent?: boolean;
  height?: number;
  padding?: [number, number, number, number];
}

//export type IInteractionConfig = IScrollbarInteractionConfig | ISliderInteractionConfig;

export type IInteractionConfig = {
  [field: string]: any;
};

export interface IInteractions {
  type: string;
  cfg?: IInteractionConfig;
}

/**
 * 一个点位置
 */
export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface DataItem {
  [field: string]: string | number | number[] | null | undefined;
}

export interface IStyle {
  [field: string]: any;
}

export interface GraphicStyle {
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  lineWidth?: number;
  lineDash?: number[];
  lineOpacity?: number;
  opacity?: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  cursor?: string;
  [field: string]: any;
}

export interface LineStyle {
  stroke?: string;
  lineWidth?: number;
  lineDash?: number[];
  lineOpacity?: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  cursor?: string;
  [field: string]: any;
}

export interface TextStyle extends GraphicStyle {
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  lineHeight?: number;
  textAlign?: 'center' | 'left' | 'right';
  textBaseline?: 'middle' | 'top' | 'bottom';
  [field: string]: any;
}

interface TooltipDataItem {
  title?: string;
  data?: Datum;
  mappingData?: MappingDatum;
  name?: string;
  value?: string;
  color?: string;
  marker?: boolean;
  x?: number;
  y?: number;
}

export interface CustomTooltipConfig {
  title?: string;
  x?: number;
  y?: number;
  items?: TooltipDataItem[];
}
