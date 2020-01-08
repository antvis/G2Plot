import BaseInteraction from './base';
import ScrollBarInteraction from './scrollbar';
import SliderInteraction from './slider';
import PlayLineInteraction from './playline';

BaseInteraction.registerInteraction('slider', SliderInteraction);
BaseInteraction.registerInteraction('scrollbar', ScrollBarInteraction);
BaseInteraction.registerInteraction('playline', PlayLineInteraction);

export * from './base';
export default BaseInteraction;
