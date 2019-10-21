import BaseInteraction from './BaseInteraction';
import ScrollBarInteraction from './ScrollBarInteraction';
import SliderInteraction from './SliderInteraction';

BaseInteraction.registerInteraction('slider', SliderInteraction);
BaseInteraction.registerInteraction('scrollbar', ScrollBarInteraction);

export * from './BaseInteraction';
export default BaseInteraction;
