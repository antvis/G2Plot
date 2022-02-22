import { Datum, Options, ShapeStyle } from '../../types';

type FontWeight = ShapeStyle['fontWeight'];

/** 一个文本信息，wordCloud 内部 */
export interface Word {
  /**
   * @title 文本内容
   */
  text: string;
  /**
   * @title 该文本所占权重
   */
  value: number;
  /**
   * @title 用于指定颜色字段
   */
  color: string | number;
  /**
   * @title 原始数据
   */
  datum: Datum;
}

export type Tag = Word & {
  /**
   * @title 字体
   */
  font?: string;
  /**
   * @title 字体样式
   */
  style?: ShapeStyle['fontStyle'];
  /**
   * @title 文本粗细
   */
  weight?: FontWeight;
  /**
   * @title 旋转角度
   */
  rotate?: number;
  /**
   * @title 字体大小
   */
  size?: number;
  /**
   * @title 一个单词所占的盒子的内边距
   * @description 值越大单词之间的间隔越大
   */
  padding?: number;
  /**
   * @title 是否包含文本
   * @default false
   */
  hasText?: boolean;
  /**
   * @title 单词所占盒子的宽度
   */
  width?: number;
  /**
   * @title 单词所占盒子的高度
   */
  height?: number;
  /**
   * @title x 轴坐标
   */
  x?: number;
  /**
   * @title y 轴坐标
   */
  y?: number;
};

/** 词云字体样式 */
export interface WordStyle {
  /**
   * @title 词云的字体
   * @description 当为函数时，其参数是一个经过处理之后的数据元素的值
   */
  readonly fontFamily?: string | ((word: Word, index?: number, words?: Word[]) => string);
  /**
   * @title 设置字体的粗细
   * @description 当为函数时，其参数是一个经过处理之后的数据元素的值
   */
  readonly fontWeight?: FontWeight | ((word: Word, index?: number, words?: Word[]) => FontWeight);
  /**
   * @title 每个单词所占的盒子的内边距
   * @description 当为函数时，其参数是一个经过处理之后的数据元素的值  越大单词之间的间隔越大
   * @default 1
   */
  readonly padding?: number | ((word: Word, index?: number, words?: Word[]) => number);
  /**
   * @title 字体的大小范围
   * @description 当为函数时，其参数是一个经过处理之后的数据元素的值
   */
  readonly fontSize?: [number, number] | number | ((word: Word, index?: number, words?: Word[]) => number);
  /**
   * @title 旋转的最小角度和最大角度
   * @description 如果值是 number 或者 function ，则 `rotationSteps` 选项将失效
   * @default "[0, 90]"
   */
  readonly rotation?: [number, number] | number | ((word: Word, index?: number, words?: Word[]) => number);
  /**
   * @title 旋转实际的步数
   * @description 越大可能旋转角度越小，* 例如：如果 `rotation` 的值是 [0, 90]，`rotationSteps` 的值是 3，则最终可能旋转的角度有三种，分别是 0 度、45度和 90 度。
   * @default 2
   */
  readonly rotationSteps?: number;
}

export interface WordCloudOptions extends Options {
  /**
   * @title 词条内容字段
   */
  readonly wordField: string;
  /**
   * @title 词条权重字段
   */
  readonly weightField: string;
  /**
   * @title 根据该字段进行颜色映射
   */
  readonly colorField?: string;
  /**
   * @title 遮罩图片实例
   * @description 可以是图片 URL 或者 base64
   */
  readonly imageMask?: HTMLImageElement | string;
  /**
   * @title 最大执行时间
   */
  readonly timeInterval?: number;
  /**
   * @title 自定义所使用的随机函数
   * @description 其值可以是一个 [0, 1) 区间中的值；也可以是一个返回该值的函数，当该值是一个固定的值时，每次渲染；相同数据的词云图时，其对应的每个单词的布局坐标一致。
   */
  readonly random?: number | (() => number);
  /**
   * @title 词云图形状
   * @description 1，当设置为 `archimedean` 时，整个词云图接近于`椭圆`的形状。 2，当设置为 `rectangular` 时，整个词云图接近于`矩形`的形状。
   * @default "archimedean"
   */
  readonly spiral?: 'archimedean' | 'rectangular';
  /**
   * @title 自定义每个词语的坐标。
   * @description 返回值必须包含 x 和 y 属性，其余的可选。也可以在 `wordStyle` 中的选项中设置。
   */
  readonly placementStrategy?: (word: Word, index?: number, words?: Word[]) => Partial<Tag> & { x: number; y: number };
  readonly wordStyle?: WordStyle;
}
