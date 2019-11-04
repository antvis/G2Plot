import BaseInteraction from './base-refactor';
import ScrollBarInteraction from './scrollbar';
import SliderInteraction from './slider-refactor';

BaseInteraction.registerInteraction('slider', SliderInteraction);
BaseInteraction.registerInteraction('scrollbar', ScrollBarInteraction);

export * from './base-refactor';
export default BaseInteraction;
