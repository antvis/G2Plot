import { Types } from '@antv/g2';
import { Datum, Options, StyleAttr } from '../../types';
import { ID_FIELD, PATH_FIELD } from './constant';

export type VennData = (Types.Datum & { sets: string[]; [PATH_FIELD]: string; [ID_FIELD]: string })[];

/** 配置类型定义 */
export interface VennOptions extends Options {
  /**
   * @title 韦恩图数据
   */
  readonly data: Types.Datum[];
  /**
   * @title 集合字段
   */
  readonly setsField: string;
  /**
   * @title 大小字段
   */
  readonly sizeField: string;

  // 韦恩图 样式

  /**
   * @title 颜色
   */
  readonly color?: string | string[] | ((datum: Datum, defaultColor?: string) => string);
  /**
   * @title 并集合的颜色混合方式
   * @description  可选项: 参考 https://gka.github.io/chroma.js/#chroma-blend
   * @default "multiply"
   */
  readonly blendMode?: string;
  /**
   * @title point 样式
   */
  readonly pointStyle?: StyleAttr;
}

export type CustomInfo = { offsetY: number; offsetX: number } & Pick<VennOptions, 'label'>;
