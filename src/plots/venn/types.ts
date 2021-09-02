import { Options, StyleAttr } from '../../types';
import { COLOR_FIELD } from './constant';

type VennDatum = { sets: string[]; size: number; label?: string };

export type VennData = Array<
  VennDatum & {
    id: string;
    path: string;
    [COLOR_FIELD]: string;
  }
>;

/** 配置类型定义 */
export interface VennOptions extends Options {
  /** 韦恩图 数据 */
  readonly data: VennDatum[];
  /** 韦恩图 样式 */
  readonly pointStyle?: StyleAttr;
}
