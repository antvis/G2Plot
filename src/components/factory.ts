import AxisParser from './axis';
import TextDescription from './description';
import GuideLine from './guideLine';
import LabelParser from './label';

const COMPONENT_MAPPER = {
  axis: AxisParser,
  label: LabelParser,
  guideLine: GuideLine,
};

export function getComponent(name, cfg) {
  const Components = COMPONENT_MAPPER[name];
  return new Components(cfg).config;
}
