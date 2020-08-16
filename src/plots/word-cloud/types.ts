import { Options } from '../../types';

/** 词云字体样式 */
interface WordStyle {
  /** 词云的字体 */
  readonly fontFamily?: string;
  /** 设置字体的粗细 */
  readonly fontWeight?: number;
  /** 单词的网格大小，默认为 8。 越大单词之间的间隔越大 */
  readonly gridSize?: number;
  /** 字体的颜色 */
  readonly color?: string | string[] | ((word: string, weight: number) => string);
  /** 字体的大小 */
  readonly fontSize?: [number, number] | ((data: any) => number);
  /** 旋转的最小角度和最大角度 默认 [-π/2,π/2] */
  readonly rotation?: [number, number];
  /** 旋转实际的步数,越大可能旋转角度越小 */
  readonly rotationSteps?: number;
  /** 旋转的比率[0,1] 默认是 0.5 也就是 50%可能发生旋转 */
  readonly rotateRatio?: number;
}

export interface WordCloudOptions extends Options {
  /** 词条内容字段 */
  readonly wordField: string;
  /** 词条权重字段 */
  readonly weightField: string;
  /** 遮罩图片(url 或者 base64 或者图片实例) */
  readonly maskImage?: string | HTMLImageElement;
  /** 背景颜色 */
  readonly backgroundColor?: string;
  /** 文字样式配置 */
  readonly wordStyle?: WordStyle;
}
