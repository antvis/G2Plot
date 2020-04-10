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
  registerInteraction,
  registerShape,
  getTheme,
  Util,
  getShapeFactory,
} from '@antv/g2';
export { VIEW_LIFE_CIRCLE, COMPONENT_TYPE, FIELD_ORIGIN } from '@antv/g2/lib/constant';
export { MarkerSymbols } from '@antv/g2/lib/util/marker';
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
  MappingDatum,
} from '@antv/g2/lib/interface';
export { DEFAULT_ANIMATE_CFG, getDefaultAnimateCfg, doAnimate } from '@antv/g2/lib/animate';
export { default as Element } from '@antv/g2/lib/geometry/element';

// Component
import HtmlTooltip from '@antv/component/lib/tooltip/html';
import HtmlTooltipTheme from '@antv/component/lib/tooltip/html-theme';
import TooltipCssConst from '@antv/component/lib/tooltip/css-const';
export { HtmlTooltip, HtmlTooltipTheme, TooltipCssConst };
export { GroupComponent, Axis, Legend, Tooltip, Slider, Scrollbar } from '@antv/component';
export { GroupComponentCfg, TooltipCfg } from '@antv/component/lib/types';

// Coordinate
export { Coordinate } from '@antv/coord';

// Common
export const ORIGIN = 'origin';
