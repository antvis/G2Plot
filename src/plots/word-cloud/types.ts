import { Datum, Options, ShapeStyle } from '../../types';

type FontWeight = ShapeStyle['fontWeight'];

/** 一个文本信息，wordCloud 内部 */
export interface Word {
  /** 文本内容 */
  text: string;
  /** 该文本所占权重 */
  value: number;
  /** 用于指定颜色字段 */
  color: string | number;
  /** 原始数据 */
  datum: Datum;
}

export type Tag = Word & {
  /** 字体 */
  font?: string;
  /** 字体样式 */
  style?: ShapeStyle['fontStyle'];
  /** 文本粗细 */
  weight?: FontWeight;
  /** 旋转角度 */
  rotate?: number;
  /** 字体大小 */
  size?: number;
  /** 一个单词所占的盒子的内边距，值越大单词之间的间隔越大 */
  padding?: number;
  /** 是否包含文本 */
  hasText?: boolean;
  /** 单词所占盒子的宽度 */
  width?: number;
  /** 单词所占盒子的高度 */
  height?: number;
  /** x 轴坐标 */
  x?: number;
  /** y 轴坐标 */
  y?: number;
};

/** 词云字体样式 */
export interface WordStyle {
  /** 词云的字体, 当为函数时，其参数是一个经过处理之后的数据元素的值 */
  readonly fontFamily?: string | ((word: Word, index?: number, words?: Word[]) => string);
  /** 设置字体的粗细, 当为函数时，其参数是一个经过处理之后的数据元素的值 */
  readonly fontWeight?: FontWeight | ((word: Word, index?: number, words?: Word[]) => FontWeight);
  /**
   * 每个单词所占的盒子的内边距，默认为 1。 越大单词之间的间隔越大。
   * 当为函数时，其参数是一个经过处理之后的数据元素的值
   */
  readonly padding?: number | ((word: Word, index?: number, words?: Word[]) => number);
  /** 字体的大小范围,当为函数时，其参数是一个经过处理之后的数据元素的值 */
  readonly fontSize?: [number, number] | number | ((word: Word, index?: number, words?: Word[]) => number);
  /**
   * 旋转的最小角度和最大角度 默认 [0, 90]。
   *
   * 注意：如果值是 number 或者 function ，则
   * `rotationSteps` 选项将失效。
   */
  readonly rotation?: [number, number] | number | ((word: Word, index?: number, words?: Word[]) => number);
  /**
   * 旋转实际的步数,越大可能旋转角度越小, 默认是 2。
   *
   * 例如：如果 `rotation` 的值是 [0, 90]，`rotationSteps` 的值是 3，
   * 则最终可能旋转的角度有三种，分别是 0 度、45度和 90 度。
   */
  readonly rotationSteps?: number;
}

export interface WordCloudOptions extends Options {
  /** 词条内容字段 */
  readonly wordField: string;
  /** 词条权重字段 */
  readonly weightField: string;
  /** 根据该字段进行颜色映射 */
  readonly colorField?: string;
  /** 遮罩图片实例，可以是图片 URL 或者 base64 */
  readonly imageMask?: HTMLImageElement | string;
  /** 最大执行时间 */
  readonly timeInterval?: number;
  /**
   * 自定义所使用的随机函数，其值可以是一个 [0, 1) 区间中的值，
   * 也可以是一个返回该值的函数，当该值是一个固定的值时，每次渲染
   * 相同数据的词云图时，其对应的每个单词的布局坐标一致。
   *
   * 默认使用的是浏览器内置的 Math.random，也就是每次渲染，单词的位置都不一样。
   */
  readonly random?: number | (() => number);
  /**
   * 1，当设置为 `archimedean` 时，整个词云图接近于`椭圆`的形状。
   * 2，当设置为 `rectangular` 时，整个词云图接近于`矩形`的形状。
   * 默认是 `archimedean`。
   */
  readonly spiral?: 'archimedean' | 'rectangular';
  /**
   * 自定义每个词语的坐标。
   * 返回值必须包含 x 和 y 属性，其余的可选。也可以在 `wordStyle` 中的
   * 选项中设置。
   */
  readonly placementStrategy?: (word: Word, index?: number, words?: Word[]) => Partial<Tag> & { x: number; y: number };
  readonly wordStyle?: WordStyle;
}
