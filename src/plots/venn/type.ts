import type { Options } from '../../types/common';

export type VennOptions = Options & {
  /**
   * @title 集合空间键名
   */
  setsField: string;
  /**
   * @title 集合大小键名
   */
  sizeField: string;
};

export enum DefaultTransformKey {
  color = 'key',
  d = 'path',
}
