import BaseInteraction, { InteractionCtor } from './base';
import SliderInteraction from './slider';

BaseInteraction.registerInteraction('slider', SliderInteraction);

export * from './base';
export default BaseInteraction;
