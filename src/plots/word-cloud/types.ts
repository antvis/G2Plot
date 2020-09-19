import { ShapeAttrs } from '@antv/g2/lib/dependents';
import { Options } from '../../types';

type FontWeight = ShapeAttrs['fontWeight'];

export interface DataItem {
  /** 文本内容 */
  text: string;
  /** 该文本所占权重 */
  value: number;
  /** 字体 */
  font?: string;
  /** 字体样式 */
  style?: ShapeAttrs['fontStyle'];
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
}

/** 词云字体样式 */
interface WordStyle {
  /** 词云的字体, 当为函数时，其参数是一个经过处理之后的数据元素的值 */
  readonly fontFamily?: string | ((row: DataItem) => string);
  /** 设置字体的粗细, 当为函数时，其参数是一个经过处理之后的数据元素的值 */
  readonly fontWeight?: FontWeight | ((row: DataItem) => FontWeight);
  /**
   * 每个单词所占的盒子的内边距，默认为 1。 越大单词之间的间隔越大。
   * 当为函数时，其参数是一个经过处理之后的数据元素的值
   */
  readonly padding?: number | ((row: DataItem) => number);
  /** 字体的大小范围,当为函数时，其参数是一个经过处理之后的数据元素的值 */
  readonly fontSize?: [number, number] | ((row: DataItem) => number);
  /** 旋转的最小角度和最大角度 默认 [0, 90] */
  readonly rotation?: [number, number];
  /** 旋转实际的步数,越大可能旋转角度越小, 默认是 2 */
  readonly rotationSteps?: number;
  /** 旋转的比率[0,1] 默认是 0.5 也就是 50%可能发生旋转 */
  readonly rotateRatio?: number;
}

export interface WordCloudOptions extends Options {
  /** 词条内容字段 */
  readonly wordField: string;
  /** 词条权重字段 */
  readonly weightField: string;
  /** 遮罩图片实例 */
  readonly imageMask?: HTMLImageElement;
  /** 最大执行时间 */
  readonly timeInterval?: number;
  /** https://github.com/jasondavies/d3-cloud#spiral */
  readonly spiral?: 'archimedean' | 'rectangular' | ((size: any) => (t: any) => number[]);
  /** 文字样式配置 */
  readonly wordStyle?: WordStyle;
}
