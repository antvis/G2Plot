// components parser
import AxisParser from './axis/parser';
import GuideLine from './guide-line';
import LabelParser from './label/parser';

// components state methods
import axisState from './axis/state';
import labelState from './label/state';
import tooltipState from './tooltip/state';

type FirstArgs<T> = T extends new (first: infer U)=>any ? U : never;

const COMPONENT_MAPPER = {
  axis: AxisParser,
  label: LabelParser,
  guideLine: GuideLine,
};

const STATE_MAPPER = {
  tooltip: tooltipState,
  label: labelState,
  axis: axisState,
};

export function getComponent<K extends keyof typeof COMPONENT_MAPPER>(
  name: K,
  cfg: FirstArgs<typeof COMPONENT_MAPPER[K]>
) {
  const Components = COMPONENT_MAPPER[name];
  return new Components(cfg).config;
}

export function getComponentStateMethod(name, type) {
  return STATE_MAPPER[name][type];
}
