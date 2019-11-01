import clearOverlapping from './clear-overlapping';
import datetimeStringAbbrevaite from './datetime-string-abbrevaite';
import digitsAbbreviate from './digits-abbreviate';
import nodeJitter from './node-jitter';
import nodeJitterUpward from './node-jitter-upward';
import nodesResampling from './nodes-resampling';
import nodesResamplingByAbbrevate from './nodes-resampling-by-abbrevate';
import nodesResamplingByChange from './nodes-resampling-by-change';
import nodesResamplingByState from './nodes-resampling-by-state';
import robustAbbrevaite from './robust-abbrevaite';
import textAbbreviate from './text-abbreviate';
import textHide from './text-hide';
import textRotation from './text-rotation';
import textWrapper from './text-wrapper';

export const rulesLib = {
  textWrapper,
  textRotation,
  textAbbreviate,
  textHide,
  digitsAbbreviate,
  datetimeStringAbbrevaite,
  robustAbbrevaite,
  nodesResampling,
  nodesResamplingByAbbrevate,
  nodesResamplingByChange,
  nodesResamplingByState,
  nodeJitter,
  nodeJitterUpward,
  clearOverlapping,
};

export function registerResponsiveRule(name, method) {
  // todo: 防止覆盖
  rulesLib[name] = method;
}
