import PieBaseLabel, { PieLabelConfig } from './base-label';
import PieInnerLabel from './inner-label';
import PieOuterLabel from './outer-label';
import PieOuterCenterLabel from './outer-center-label';

const PieLabels = {
  inner: PieInnerLabel,
  outer: PieOuterLabel,
  'outer-center': PieOuterCenterLabel,
};

export function getPieLabel(type: string): new (plot: any, C: PieLabelConfig) => PieBaseLabel {
  if (!PieLabels[type]) {
    console.warn(`this label ${type} is not registered`);
    return;
  }
  return PieLabels[type];
}

export { PieLabelConfig };
