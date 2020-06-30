// dependents是基础依赖，以便按需使用plot
import GestureController from '@antv/g2/lib/chart/controller/gesture';
import { registerComponentController } from '@antv/g2';
export { GestureController };
registerComponentController('gesture', GestureController);

// G
export { IElement, ICanvas, IGroup, IShape, BBox, Event as GraphicEvent } from '@antv/g-base';
export { Canvas } from '@antv/g-canvas';
export { Canvas as SVG } from '@antv/g-svg';

// G-Gesture
export { GM, Wheel, GestureEvent } from '@antv/g-gesture';

// G2
export {
  View,
  registerAnimation,
  registerGeometry,
  Geometry,
  Interaction,
  InteractionAction,
  registerInteraction,
  registerAction,
  registerShape,
  getTheme,
  Util,
  getShapeFactory,
  ComponentController,
  registerComponentController,
} from '@antv/g2';
export { VIEW_LIFE_CIRCLE, COMPONENT_TYPE, FIELD_ORIGIN } from '@antv/g2/lib/constant';
export { default as TooltipController } from '@antv/g2/lib/chart/controller/tooltip';
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
import GrammarInteraction from '@antv/g2/lib/interaction/grammar-interaction';
export { GrammarInteraction };
import * as InteractionUtils from '@antv/g2/lib/interaction/action/util';
export { InteractionUtils };
export { DEFAULT_ANIMATE_CFG, getDefaultAnimateCfg, doAnimate } from '@antv/g2/lib/animate';
export { default as Element } from '@antv/g2/lib/geometry/element';

// Component
import HtmlTooltip from '@antv/component/lib/tooltip/html';
import HtmlTooltipTheme from '@antv/component/lib/tooltip/html-theme';
import * as TooltipCssConst from '@antv/component/lib/tooltip/css-const';
export { HtmlTooltip, HtmlTooltipTheme, TooltipCssConst };
export { GroupComponent, Axis, Legend, Tooltip, Slider, Scrollbar } from '@antv/component';
export { GroupComponentCfg, TooltipCfg } from '@antv/component/lib/types';

// Coordinate
export { Coordinate } from '@antv/coord';

// Common
export const ORIGIN = 'origin';
export const _ORIGIN = '_origin';
