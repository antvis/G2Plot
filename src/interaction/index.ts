import BaseInteraction from './base';
import ScrollbarInteraction from './scrollbar';
import SliderInteraction from './slider';
import TimeLineInteraction from './timeline';

BaseInteraction.registerInteraction('slider', SliderInteraction);
BaseInteraction.registerInteraction('scrollbar', ScrollbarInteraction);
BaseInteraction.registerInteraction('timeline', TimeLineInteraction);

export * from './base';
export default BaseInteraction;
