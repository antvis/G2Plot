import { Geometry, Types } from '@antv/g2';
import { Animation } from './animation';
import { Annotation } from './annotation';
import { ColorAttr, PatternAttr } from './attr';
import { Axis } from './axis';
import { Interaction } from './interaction';
import { Label } from './label';
import { Legend } from './legend';
import { Meta } from './meta';
import { Scrollbar } from './scrollbar';
import { Slider } from './slider';
import { State } from './state';
import { Tooltip } from './tooltip';

/** annotation position */
export type AnnotationPosition = Types.AnnotationPosition;
export type RegionPositionBaseOption = Types.RegionPositionBaseOption;
export type TextOption = Types.TextOption;

/** 一条数据记录 */
export type Datum = Record<string, any>;

/** 一个数据序列 */
export type Data = Datum[];

/** 点位置信息 */
export type Point = {
  readonly x: number;
  readonly y: number;
};

/** 描述一个点 x y 位置 */
export type Position = [number, number];

/** 一个区域描述 */
export type Region = {
  /**
   * @title 开始位置
   * @description the top-left corner of layer-range, range from 0 to 1, relative to parent layer's range
   */
  readonly start: Point;
  /**
   * @title 结束位置
   * @description the bottom-right corner of layer-range, range from 0 to 1, relative to parent layer's range
   */
  readonly end: Point;
};

/** 位置 */
export type BBox = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
};

/** 文字 */
export type TextStyle = {
  /**
   * @title 文本大小
   */
  readonly fontSize?: number;
  /**
   * @title 字体系列
   */
  readonly fontFamily?: string;
  /**
   * @title 文本粗细
   */
  readonly fontWeight?: number;
  /**
   * @title 文本行高
   */
  readonly lineHeight?: number;
  /**
   * @title 文本对齐方式
   */
  readonly textAlign?: 'center' | 'left' | 'right';
  /**
   * @title 文本基线
   */
  readonly textBaseline?: 'middle' | 'top' | 'bottom';
};

export type Size = {
  readonly width: number;
  readonly height: number;
};

/** 基础的 Options 配置 */
export type Options = {
  /**
   * @title 画布宽度
   */
  readonly width?: number;
  /**
   * @title 画布高度
   */
  readonly height?: number;
  /**
   * @title 自适应
   * @description 画布是否自动适配容器大小，默认为 true
   */
  readonly autoFit?: boolean;
  /**
   * @title 内填充
   * @description 画布的 padding 值，或者开启 'auto'
   */
  readonly padding?: number[] | number | 'auto';
  /**
   * @title 画布宽度
   * @description 额外增加的 padding 值
   */
  readonly appendPadding?: number[] | number;
  /**
   * @title 额外填充
   * @description 是否同步子 view 的 padding
   */
  readonly syncViewPadding?: boolean | Types.SyncViewPaddingFn;

  /**
   * @title 国际化
   * @description 语言配置
   */
  readonly locale?: string;

  /**
   * @title 渲染引擎
   * @description 设置渲染引擎，'svg' | 'canvas'
   * @default "canvas"
   */
  readonly renderer?: 'svg' | 'canvas';
  /**
   * @title 屏幕像素比
   * @description 默认为 window.devicePixelRatio
   */
  readonly pixelRatio?: number;
  /**
   * @title 是否启局部渲染
   * @description 是否开启局部渲染，默认为 true
   * @default true
   */
  readonly localRefresh?: boolean;
  /**
   * @title 是否支持 CSS transform
   * @description 开启后图表的交互以及事件将在页面设置了 css transform 属性时生效，默认关闭。
   * @default false
   */
  readonly supportCSSTransform?: boolean;
  /**
   * @title 是否开启 label 延迟渲染
   * @description 开启后 label 渲染会在浏览器空闲时机执行。可制定具体 number 数值，来限定 timeout 时间 (建议开启时，指定 timeout 时间)
   * @default false
   */
  readonly useDeferredLabel?: boolean | number;

  /**
   * @title 数据
   * @description 设置画布具体的数据
   */
  readonly data: Record<string, any>[];
  /**
   * @title 数据字段元信息
   * @description 设置数据字段元信息
   */
  readonly meta?: Record<string, Meta>;

  // G2 相关
  /**
   * @title 主题
   * @description G2 主题，字符串或者 theme object
   * @default "light"
   */
  readonly theme?: string | object;
  /**
   * @title 颜色色板
   * @description 设置颜色色板
   */
  readonly color?: ColorAttr;
  /**
   * @title pattern 配置
   * @description 设置图表 pattern
   */
  readonly pattern?: PatternAttr;
  /**
   * @title 横坐标
   * @description 设置画布横坐标的配置项
   */
  readonly xAxis?: Axis;
  /**
   * @title 纵坐标
   * @description 设置画布纵坐标的配置项
   */
  readonly yAxis?: Axis;
  /**
   * @title 数据标签
   * @description 设置数据标签
   */
  readonly label?: Label;
  /**
   * @title tooltip 提示
   * @description 设置画布 tooltip 的配置项
   */
  readonly tooltip?: Tooltip;
  /**
   * @title 图例
   * @description 设置画布图例 legend 的配置项
   */
  readonly legend?: Legend;
  /**
   * @title 缩略轴
   * @description 设置缩略轴 slider 的配置项
   */
  readonly slider?: Slider;
  /**
   * @title 滚动条
   * @description 设置画布缩略轴 scrollbar 的配置项
   */
  readonly scrollbar?: Scrollbar;
  /**
   * @title 动画
   * @description 设置图表动画
   */
  readonly animation?: Animation | ((type: string, g: Geometry) => Animation) | boolean;
  /**
   * @title 交互
   * @description 设置画布交互行为
   */
  readonly interactions?: Interaction[];
  /**
   * @title 注解
   * @description 设置画布注解
   */
  readonly annotations?: Annotation[];
  /**
   * @title 图表状态
   * @description 设置画布配置 active，inactive，selected 三种状态的样式，也可在 Theme 主题中配置
   */
  readonly state?: State;
  /**
   * @title 是否裁剪
   * @description 是否对超出坐标系范围的 Geometry 进行剪切
   */
  readonly limitInPlot?: boolean;
  /**
   * @title 内置交互
   * @description 内置注册的交互
   * @deprecated false
   */
  readonly defaultInteractions?: string[];
};

export type RawFields = string[] | ((type: string, field: 'color' | 'shape' | 'size' | 'style') => string[] | never);
