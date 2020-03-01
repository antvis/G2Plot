/**
 * G2-Plot配置项
 * 注意事项：
 * 1. 命名采用驼峰
 * 2. 如果是枚举值，不使用enum，全部列出
 * 3. 减少嵌套，尽量平铺配置
 */
import { ShapeAttrs } from '@antv/g-base';
import { Options, AttributeOption, AdjustOption, LabelOption } from '../dependents';
import { LooseMap } from './types';

export interface ITitle {
  visible: boolean;
  text: string;
  style?: {};
  alignWithAxis?: boolean;
}

export interface IDescription {
  visible: boolean;
  text: string;
  style?: {};
  alignWithAxis?: boolean;
}

type IEvents = LooseMap<string>;

export type Formatter = (text: string, item: any, idx: number) => string;

/**
 * 通用 Shape 属性样式定义
 */
export interface IStyleConfig extends ShapeAttrs {}

export interface IBaseAxis {
  /** 轴是否需要显示，默认true */
  visible?: boolean;
  /** 轴类型，对应scale类型 */
  type?: 'linear' | 'time' | 'cat' | 'dateTime' | 'category' | 'log' | 'pow' | 'timeCat';
  /** 轴位置，默认下和左 */
  line?: {
    visible?: boolean;
    style?: IStyleConfig;
  };
  grid?: {
    /** 网格线是否显示 */
    visible?: boolean;
    line?: {
      style?: IStyleConfig | ((text: string, idx: number, count: number) => IStyleConfig);
      type?: 'line' | 'circle';
    };
    /** 网格设置交替的颜色，指定一个值则先渲染偶数层，两个值则交替渲染 */
    alternateColor?: string | string[];
  };
  autoRotateLabel?: boolean; // 当 label 过长发生遮挡时是否自动旋转坐标轴文本，默认为 true
  autoHideLabel?: boolean; // 当 label 存在遮挡时，是否自动隐藏被遮挡的坐标轴文本，默认为 false
  autoEllipsisLabel?: boolean;
  autoRotateTitle?: boolean;
  label?: {
    visible?: boolean;
    formatter?: (name: string, tick: any, index: number) => string;
    offset?: number; // 坐标轴文本距离坐标轴线的距离
    offsetX?: number; // 在 offset 的基础上，设置坐标轴文本在 x 方向上的偏移量
    offsetY?: number; // 在 offset 的基础上，设置坐标轴文本在 y 方向上的偏移量
    rotate?: number; // label 文本旋转的角度，使用角度制
    useHtml?: boolean; // 是否开启使用 HTML 渲染坐标轴文本
    htmlTemplate?: string; // 返回 label 的 html 字符串，只在 useHtml: true 的情况下生效
    style?: IStyleConfig;
  };
  title?: {
    visible?: boolean;
    autoRotate?: boolean;
    text?: string;
    offset?: number;
    style?: IStyleConfig;
  };
  tickLine?: {
    visible?: boolean;
    style?: IStyleConfig;
  };
  events?: IEvents;
}
/** Linear型 */
export interface IValueAxis extends IBaseAxis {
  type?: 'linear';
  /** tick相关配置 */
  nice?: boolean;
  min?: number;
  max?: number;
  minLimit?: number;
  maxLimit?: number;
  tickCount?: number;
  tickInterval?: number;
}
/** 时间型 */
export interface ITimeAxis extends IBaseAxis {
  type?: 'time';
  /** tick相关配置 */
  tickInterval?: string;
  tickCount?: number;
  groupBy?: string;
}
/** 离散类目型 */
export interface ICatAxis extends IBaseAxis {
  type?: 'category';
  /** tick相关配置 */
  tickInterval?: number;
  tickCount?: number;
  groupBy?: string;
}

export type Axis = ICatAxis | IValueAxis | ITimeAxis;

export interface Label {
  visible?: boolean;
  type?: string;
  formatter?: (text: string, item: any, idx: number, ...extras: any[]) => string;
  /** 精度配置，可通过自定义精度来固定数值类型 label 格式 */
  precision?: number;
  /** 添加后缀 */
  suffix?: string;
  style?: {};
  offset?: number;
  offsetX?: number;
  offsetY?: number;
  events?: IEvents;
  position?: string;
  adjustColor?: boolean;
  adjustPosition?: boolean;
  autoRotate?: boolean;
  labelLine?: any;
}

export interface Legend {
  visible?: boolean;
  /** 位置 */
  position?: string;
  /** 翻页 */
  flipPage?: boolean;
  events?: IEvents;
  formatter?: (...args: any) => string;
  offsetX?: number;
  offsetY?: number;
  clickable?: boolean;
  title?: {
    visible?: boolean;
    spacing?: number;
    style?: IStyleConfig;
  };
}

export interface Tooltip {
  visible?: boolean;
  shared?: boolean;
  /** html */
  showTitle?: boolean;
  html?: HTMLDivElement;
  formatter?: (...args: any) => string;
  htmlContent?: (title: string, items: any[]) => string;
  containerTpl?: string;
  itemTpl?: string;
  /** 辅助线 */
  //crosshair?: 'x' | 'y' | 'cross' | boolean;
  //crosshairs?: { type: string; style?: IStyleConfig }; // FIXME:
  showCrosshairs?: boolean;
  crosshairs?: 'x' | 'y' | 'cross';
  style?: IStyleConfig;
  offset?: number;
  showMarkers?: boolean;
}

interface Animation {
  /** 动画模式，延伸or缩放 */
  type?: string;
  duration?: number;
  easing?: string;
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
  style?: IStyleConfig;
  label?: LabelOption | false;
  animate?: {};
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
  style?: IStyleConfig;
  related?: string[];
}

export interface SliderConfig {
  visible?: boolean;
  start?: number;
  end?: number;
  foregroundColor?: string;
  backgroundColor?: string;
  height?: number;
  paddingTop?: number;
  paddingBottom?: number;
}

export interface ISliderInteractionConfig {
  /** 在图表中的位置，默认 horizontal */
  type?: 'horizontal' | 'vertical';
  /** 宽度，在 vertical 下生效 */
  width?: number;
  /** 高度，在 horizontal 下生效 */
  height?: number;
  /** 可选 padding */
  padding?: [number, number, number, number];
  /** 前景框颜色  */
  foregroundColor?: string;
  /** 背景框颜色 */
  backgroundColor?: string;
  /** 默认开始位置, 0~1 */
  start?: number;
  /** 默认结束位置, 0~1 */
  end?: number;
}

export interface IScrollbarInteractionConfig {
  /** 在图表中的位置，默认 horizontal */
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
