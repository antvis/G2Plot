import BaseInteraction from './BaseInteraction';
import ScrollbarInteraction from './ScrollbarInteraction';
import SliderInteraction from './SliderInteraction';

BaseInteraction.registerInteraction('slider', SliderInteraction);
BaseInteraction.registerInteraction('scrollbar', ScrollbarInteraction);

export * from './BaseInteraction';
export default BaseInteraction;
