// G
export { IElement, ICanvas, IGroup, IShape, BBox } from '@antv/g-base';
export { Canvas } from '@antv/g-canvas';
export { Canvas as SVG } from '@antv/g-svg';

// G2
export {
  View,
  registerAnimation,
  registerGeometry,
  Geometry,
  Interaction,
  registerShape,
  getTheme,
  Util,
} from '@antv/g2';
export { VIEW_LIFE_CIRCLE } from '@antv/g2/lib/constant';
export {
  Datum,
  Data,
  LooseObject,
  Options,
  Point,
  ShapeInfo,
  AttributeOption,
  AdjustOption,
  LabelOption,
} from '@antv/g2/lib/interface';

// Component
import HtmlTooltip from '@antv/component/lib/tooltip/html';
export { HtmlTooltip };
export { Axis, Slider } from '@antv/component';
export { Scrollbar } from '@antv/component/lib/scrollbar/scrollbar';
export { TooltipCfg } from '@antv/component/lib/types';
