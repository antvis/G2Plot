import {
  ArcOption,
  RegionFilterOption,
  ImageOption,
  LineOption,
  TextOption,
  RegionOption,
  DataMarkerOption,
  DataRegionOption,
} from '@antv/g2/lib/interface';

export type Annotation =
  | ArcOption
  | ImageOption
  | LineOption
  | TextOption
  | RegionOption
  | RegionFilterOption
  | DataMarkerOption
  | DataRegionOption;
