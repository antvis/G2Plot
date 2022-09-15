import { registerAction, registerInteraction } from '@antv/g2';
import { ConversionTagAction } from './funnel-conversion-tag';

const FUNNEL_CONVERSION_TAG = 'funnel-conversion-tag';
export const FUNNEL_LEGEND_FILTER = 'funnel-afterrender';
export const interactionStart = { trigger: 'afterrender', action: `${FUNNEL_CONVERSION_TAG}:change` };

registerAction(FUNNEL_CONVERSION_TAG, ConversionTagAction);
registerInteraction(FUNNEL_LEGEND_FILTER, {
  start: [interactionStart],
});
