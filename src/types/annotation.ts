import { Types } from '@antv/g2';

type AnnotationOption =
  | Types.ArcOption
  | Types.ImageOption
  | Types.LineOption
  | Types.TextOption
  | Types.RegionOption
  | Types.RegionFilterOption
  | Types.DataMarkerOption
  | Types.DataRegionOption
  | Types.ShapeAnnotationOption
  | Types.HtmlAnnotationOption;

export type Annotation = { id?: string } & AnnotationOption;
