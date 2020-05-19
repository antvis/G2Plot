import BaseInteraction from './base';
import ScrollbarInteraction from './scrollbar';
import SliderInteraction from './slider';
import TimeLineInteraction from './timeline';
import TooltipIndicatorInteraction from './tooltip-indicator';

BaseInteraction.registerInteraction('slider', SliderInteraction);
BaseInteraction.registerInteraction('scrollbar', ScrollbarInteraction);
BaseInteraction.registerInteraction('timeline', TimeLineInteraction);
BaseInteraction.registerInteraction('tooltip-indicator', TooltipIndicatorInteraction);

export * from './base';
export default BaseInteraction;
