// components parser
import AxisParser from './axis/parser-refactor';
import GuideLine from './guide-line';
import LabelParser from './label/parser-refactor';

// components state methods
import axisState from './axis/state';
import labelState from './label/state';
import tooltipState from './tooltip/state';

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

export function getComponent(name, cfg) {
  const Components = COMPONENT_MAPPER[name];
  return new Components(cfg).config;
}

export function getComponentStateMethod(name, type) {
  return STATE_MAPPER[name][type];
}
