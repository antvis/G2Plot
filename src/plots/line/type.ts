import { Annotation } from '../../types/annotation';
import type {
  Data,
  Scale,
  Axis,
  Legend,
  Slider,
  Scrollbar,
  Label,
} from '../../types/common';

export type LineOptions = {
  data?: Data;
  scale?: Record<string, Scale>;
  axis?: Record<string, Axis>;
  legend?: Record<string, Legend>;
  slider?: Record<string, Slider>;
  scrollbar?: Record<string, Scrollbar>;
  labels?: Label[];
  annotations?: Annotation[];
  animate?: Record<string, any>;
  style?: Record<string, any>;
};
