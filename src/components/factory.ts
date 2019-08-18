import AxisParser from './axis';
import LabelParser from './label';
import GuideLine from './guideLine';
import TextDescription from './description';

const COMPONENT_MAPPER = {
  axis: AxisParser,
  label: LabelParser,
  guideLine: GuideLine
};

export function getComponent(name, cfg) {
  const Components = COMPONENT_MAPPER[name];
  return new Components(cfg).config;
}
