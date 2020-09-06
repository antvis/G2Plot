import { Options } from '../../types';

/** 词云字体样式 */
interface WordStyle {
  /** 词云的字体, 当为函数时，其参数是一个经过处理之后的数据元素的值 */
  readonly fontFamily?: string | ((row: any) => string);
  /** 设置字体的粗细, 当为函数时，其参数是一个经过处理之后的数据元素的值 */
  readonly fontWeight?: (row: any) => 'normal' | 'bold' | 'bolder' | 'lighter' | number;
  /**
   * 每个单词所占的盒子的内边距，默认为 1。 越大单词之间的间隔越大。
   * 当为函数时，其参数是一个经过处理之后的数据元素的值
   */
  readonly padding?: number | ((row: any) => number);
  /** 字体的大小范围,当为函数时，其参数是一个经过处理之后的数据元素的值 */
  readonly fontSize?: [number, number] | ((row: any) => number);
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
  /** 分组字段 */
  readonly seriesField?: string;
  /** 遮罩图片实例 */
  readonly imageMask?: HTMLImageElement;
  /** 背景颜色 */
  readonly backgroundColor?: string;
  /** 最大执行时间 */
  readonly timeInterval?: number;
  readonly spiral?: 'archimedean' | 'rectangular';
  /** 文字样式配置 */
  readonly wordStyle?: WordStyle;
}
