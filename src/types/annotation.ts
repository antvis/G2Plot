type ErrorBar = {
  type: 'errorbar';
  extent: number | string | [number, number] | [string, string];
  data?: any;
  encode?: Record<string, any>;
  style?: Record<string, any>;
};

type ErrorBand = {
  type: 'errorband';
  extent: number | string | [number, number] | [string, string];
  data?: any;
  encode?: Record<string, any>;
  style?: Record<string, any>;
};

export type Annotation = ErrorBar | ErrorBand | any;
