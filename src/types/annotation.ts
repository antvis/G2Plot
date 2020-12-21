import { Types } from '@antv/g2';

export type Annotation =
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
