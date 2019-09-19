import clearOverlapping from './clearOverlapping';
import datetimeStringAbbrevaite from './datetimeStringAbbrevaite';
import digitsAbbreviate from './digitsAbbreviate';
import nodeJitter from './nodeJitter';
import nodeJitterUpward from './nodeJitterUpward';
import nodesResampling from './nodesResampling';
import nodesResamplingByAbbrevate from './nodesResamplingByAbbrevate';
import nodesResamplingByChange from './nodesResamplingByChange';
import nodesResamplingByState from './nodesResamplingByState';
import robustAbbrevaite from './robustAbbrevaite';
import textAbbreviate from './textAbbreviate';
import textHide from './textHide';
import textRotation from './textRotation';
import textWrapper from './textWrapper';

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
