import { Annotation } from './annotation';

/**
 * @todo Import specific definitions from @antv/g2.
 */
export type Data = any;

export type Encode = any;

export type Transform = any;

export type Scale = any;

export type Label = any;

export type Slider = any;

export type Scrollbar = any;

export type Axis = any;

export type Legend = any;

export type Options = {
  data?: Data;
  scale?: Record<string, Scale>;
  encode?: Record<string, Encode>;
  transform?: Transform[];
  labels?: Label[];
  annotations?: Annotation[];
  axis?: Record<string, Axis>;
  legend?: Record<string, Legend>;
  slider?: Record<string, Slider>;
  scrollbar?: Record<string, Scrollbar>;
  animate?: Record<string, any>;
  style?: Record<string, any>;

  // More feature options.
  isStack?: boolean;
  isGroup?: boolean;
  isPercent?: boolean;
};

type MarkDescriptor = any;

export type Adaptor<P, O extends Options = Options> = (
  props: P,
  options: O,
) => (marks: MarkDescriptor[]) => MarkDescriptor[];
