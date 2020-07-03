export type Options = {
  readonly width: number;
  readonly height: number;
  readonly autoFit?: boolean;
  readonly padding?: number[] | 'auto';
  readonly data: Record<string, any>[];
};
