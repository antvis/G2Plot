import type { Options } from '../../types/common';

export type FunnelOptions = Options & {
  compareField?: string;
  isTransposed?: boolean;
};
