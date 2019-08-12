import textWrapper from './textWrapper';
import textRotation from './textRotation';
import textAbbreviate from './textAbbreviate';
import textHide from './textHide';
import digitsAbbreviate from './digitsAbbreviate';
import datetimeStringAbbrevaite from './datetimeStringAbbrevaite';
import robustAbbrevaite from './robustAbbrevaite';
import nodesResampling from './nodesResampling';
import nodesResamplingByAbbrevate from './nodesResamplingByAbbrevate';
import nodesResamplingByChange from './nodesResamplingByChange';
import nodesResamplingByState from './nodesResamplingByState';
import nodeJitter from './nodeJitter';
import nodeJitterUpward from './nodeJitterUpward';
import clearOverlapping from './clearOverlapping';

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
