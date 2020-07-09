import { Axis } from './axis';
import { Label } from './label';
import { Tooltip } from './tooltip';
import { Legend } from './legend';
import { Interaction } from './interaction';
import { Animation } from './animation';

/** 一条数据记录 */
export type Datum = Record<string, any>;

/** 一个数据序列 */
export type Data = Datum[];

/** 点位置信息 */
export type Point = {
  readonly x: number;
  readonly y: number;
};

/** 一个区域描述 */
export type Region = {
  /** the top-left corner of layer-range, range from 0 to 1, relative to parent layer's range */
  readonly start: Point;
  /** the bottom-right corner of layer-range, range from 0 to 1, relative to parent layer's range */
  readonly end: Point;
};

/** 位置 */
export type BBox = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
};

export type Size = {
  readonly width: number;
  readonly height: number;
};

/** scale 元信息，取名为 meta */
export type Meta = {
  readonly type?: string;
  readonly alias?: string;
  readonly values?: string[];
  readonly range?: number[];
  readonly formatter?: (v: any) => string;
};

/** 基础的 Options 配置 */
export type Options = {
  // 画布基本配置
  /** 画布宽度 */
  readonly width: number;
  /** 画布高度 */
  readonly height: number;
  /** 画布是否自动适配容器大小，默认为 true */
  readonly autoFit?: boolean;
  /** 画布的 padding 值，或者开启 'auto' */
  readonly padding?: number[] | number | 'auto';
  /** 额外怎加的 padding 值 */
  readonly appendPadding?: number[] | number;

  // 通用数据配置
  /** 具体的数据 */
  readonly data: Record<string, any>[];
  /** 数据字段元信息 */
  readonly meta?: Record<string, any>;

  // G 相关
  /** 渲染引擎 */
  readonly renderer?: 'svg' | 'canvas';
  /** 屏幕像素比，默认为 window.devicePixelRatio */
  readonly pixelRatio?: number;
  /** 是否开启局部渲染，默认为 true */
  readonly localRefresh?: boolean;

  // G2 相关
  /** 主题，G2 主题，字符串或者 theme object */
  readonly theme?: string | object;
  /** 颜色色板 */
  readonly color?: string | string[];
  readonly xAxis?: Axis;
  readonly yAxis?: Axis;
  readonly label?: Label;
  readonly tooltip?: Tooltip;
  readonly legend?: Legend;
  readonly animation?: Animation;
  readonly interactions?: Interaction[];
  // readonly guideLine?: GuideLineConfig[];
  // readonly markerPoints?: (Omit<MarkerPointCfg, 'view'> & {
  //   visible?: boolean;
  // })[];
};
