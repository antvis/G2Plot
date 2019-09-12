/**
 * G2-Plot配置项
 * 注意事项：
 * 1. 命名采用驼峰
 * 2. 如果是枚举值，不使用enum，全部列出
 * 3. 减少嵌套，尽量平铺配置
 */
import { Option } from '@antv/g2';
import { AttributeCfg, LabelOptions } from '@antv/g2/lib/element/base';
import { AdjustCfg } from '@antv/g2/lib/interface';

// import { ScaleConfig, Scale } from '@antv/scale';

export default interface Config {
  /** 数据，对象数组 */
  data: object[];
  width?: number;
  height?: number;
  /** 自适应父容器宽度和高度 */
  forceFit?: boolean;
  /** 渲染引擎 */
  renderer?: string;
  /** 字段描述信息，G2用于设置Tooltip、Scale等配置 */
  // meta?: { [fieldId: string]: ScaleConfig & { type?: Scale['type'] } };
  meta?: { [fieldId: string]: any & { type?: any } };
  /** 图表标题 */
  title?: ITitle;
  /** 图表描述 */
  description?: IDescription;
  /** padding */
  padding?: number | number[] | string;
  /** x、y轴字段 */
  xField?: string;
  yField?: string;
  /** 颜色映射 */
  color?: string | string[] | {};
  /** 大小映射 */
  size?: number | number[] | {};
  /** 形状映射 */
  shape?: string | string[] | {};
  /** 轴 */
  xAxis?: Axis;
  yAxis?: Axis;
  /** 数据标签 */
  label?: Label;
  /** Tooltip */
  tooltip?: Tooltip;
  /** 图例 */
  legend?: Legend;
  /** 动画 */
  animation?: any | boolean;
  /** 标注 */
  annotation?: any[];
  /** 样式 */
  theme?: Theme | string;
  /** 响应式规则 */
  responsiveTheme?: {} | string;
  /** 交互，待定 */
  interactions?: any[];
  /** 是否响应式 */
  responsive?: boolean;
  /** 图表层级的事件 */
  events?: {
    [k: string]: ((...args: any[]) => any) | boolean;
  };
  /** 图表初始状态 */
  defaultState: {
    active?: StateConfig;
    inActive?: StateConfig;
    selected?: StateConfig;
    disabled?: StateConfig;
  };
  // fixme: any
  [k: string]: any;
}

type Formatter = (value: any, index?: number, ...args: any[]) => string;

interface ITitle {
  text: string;
  style?: {};
  alignWithAxis?: boolean;
}

interface IDescription {
  text: string;
  style?: {};
  alignWithAxis?: boolean;
}

interface IEvents {
  [k: string]: string;
}

interface IBaseAxis {
  /** 轴是否需要显示，默认true */
  visible?: boolean;
  /** 轴类型，对应scale类型 */
  type?: 'value' | 'time' | 'category';
  /** 轴位置，默认下和左 */
  position?: 'default' | 'opposite';
  line?: {
    visible?: boolean;
    style: {};
  };
  grid?:
    | {
        visible?: boolean;
        style: {};
      }
    | ((text: string, idx: number, count: number) => any);
  autoRotateLabel: boolean; // 当 label 过长发生遮挡时是否自动旋转坐标轴文本，默认为 true
  autoHideLabel: boolean; // 当 label 存在遮挡时，是否自动隐藏被遮挡的坐标轴文本，默认为 false
  label?:
    | {
        visible?: boolean;
        formatter?: (...args: any[]) => string;
        offset?: number; // 坐标轴文本距离坐标轴线的距离
        offsetX?: number; // 在 offset 的基础上，设置坐标轴文本在 x 方向上的偏移量
        offsetY?: number; // 在 offset 的基础上，设置坐标轴文本在 y 方向上的偏移量
        rotate?: number; // label 文本旋转的角度，使用角度制
        useHtml?: boolean; // 是否开启使用 HTML 渲染坐标轴文本
        htmlTemplate?: string; // 返回 label 的 html 字符串，只在 useHtml: true 的情况下生效
        style?: {};
      }
    | ((...args: any[]) => any);
  title?: {
    visible?: boolean;
    autoRotate?: boolean;
    text?: string;
    offset?: number;
    style?: {};
  };
  tickLine?: {
    visible?: boolean;
    style?: {};
  };
  events?: IEvents;
}
/** Linear型 */
export interface IValueAxis extends IBaseAxis {
  type: 'value';
  /** tick相关配置 */
  min?: number;
  max?: number;
  minLimit?: number;
  maxLimit?: number;
  tickCount?: number;
  tickInterval?: number;
}
/** 时间型 */
export interface ITimeAxis extends IBaseAxis {
  type: 'time';
  /** tick相关配置 */
  tickInterval?: string;
  tickCount?: number;
  groupBy?: string;
}
/** 离散类目型 */
export interface ICatAxis extends IBaseAxis {
  type: 'category';
  /** tick相关配置 */
  tickInterval?: number;
  tickCount?: number;
  groupBy?: string;
}
type Axis = ICatAxis | IValueAxis | ITimeAxis;

export interface Label {
  visible: boolean;
  type?: string;
  formatter?: (text: string, item: any, idx: number) => string;
  style?: {};
  offset?: number;
  offsetX?: number;
  offsetY?: number;
  events?: IEvents;
  position?: string;
  /** 展示优化策略 */
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
}

export interface Tooltip {
  visible: boolean;
  shared: boolean;
  /** html */
  html?: HTMLDivElement;
  htmlContent?: (title: string, items: any[]) => string;
  containerTpl?: string;
  itemTpl?: string;
  /** 辅助线 */
  crosshair?: 'x' | 'y' | 'cross' | boolean;
  style?: {};
}

interface Animation {
  /** 动画模式，延伸or缩放 */
  type?: string;
  duration?: number;
  easing?: string;
}

// tslint:disable-next-line: no-empty-interface
interface Theme {}

export interface ElementOption {
  type: string;
  position: {
    fields: string[];
  };
  color?: AttributeCfg;
  size?: AttributeCfg;
  shape?: AttributeCfg;
  style?: {};
  label?: LabelOptions | false;
  animate?: {};
  adjust?: AdjustCfg[];
}

export interface G2Config {
  scales: Option.ScalesOption;
  legends: Option.LegendOption | Option.LegendsOption | boolean;
  tooltip: Option.TooltipOption | boolean;
  axes: Option.AxesOption | boolean;
  coord: Option.CoordinateOption;
  element?: ElementOption;
  elements: ElementOption[];
  annotations: any[];
  interactions: {};
  theme: any;
  panelRange: any;
}

export interface IColorConfig {
  fields?: string[];
  values?: string[];
  callback?: (...args: any[]) => any;
}

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

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
  style?: {};
  related?: string[];
}
