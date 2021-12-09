import { Types } from '@antv/g2';
import { Datum, Options, StyleAttr } from '../../types';
import { ID_FIELD, PATH_FIELD } from './constant';

export type VennData = (Types.Datum & { sets: string[]; [PATH_FIELD]: string; [ID_FIELD]: string })[];

/** 配置类型定义 */
export interface VennOptions extends Options {
  /** 韦恩图 数据 */
  readonly data: Types.Datum[];
  /** 集合字段 */
  readonly setsField: string;
  /** 大小字段 */
  readonly sizeField: string;

  // 韦恩图 样式
  /** color */
  readonly color?: string | string[] | ((datum: Datum, defaultColor?: string) => string);
  /** 并集合的颜色混合方式, 可选项: 参考 https://gka.github.io/chroma.js/#chroma-blend, 默认: multiply */
  readonly blendMode?: string;
  /** point 样式 */
  readonly pointStyle?: StyleAttr;
}

export type CustomInfo = { offsetY: number; offsetX: number } & Pick<VennOptions, 'label'>;
