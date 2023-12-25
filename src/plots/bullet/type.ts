import type { Options } from '../../types/common';

export type BulletOptions = Options & {
  color: {
    ranges: string | string[];
    measures: string | string[];
    target: string | string[];
  };
  rangeField: string;
  measureField: string;
  targetField: string;
  mapField: {
    ranges: string | string[];
    measures: string | string[];
    target: string | string[];
  };
  // 竖直｜水平
  layout: 'vertical' | 'horizontal';
  range: BulletOptions;
  measure: BulletOptions;
  target: BulletOptions;
};
