import BaseInteraction from './base';
import ScrollBarInteraction from './scrollbar';
import SliderInteraction from './slider';
import TimeLineInteraction from './timeline';

BaseInteraction.registerInteraction('slider', SliderInteraction);
BaseInteraction.registerInteraction('scrollbar', ScrollBarInteraction);
BaseInteraction.registerInteraction('timeline', TimeLineInteraction);

export * from './base';
export default BaseInteraction;
