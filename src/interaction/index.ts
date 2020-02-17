import BaseInteraction from './base';
import ScrollbarInteraction from './scrollbar';
import SliderInteraction from './slider';

BaseInteraction.registerInteraction('slider', SliderInteraction);
BaseInteraction.registerInteraction('scrollbar', ScrollbarInteraction);

export * from './base';
export default BaseInteraction;
