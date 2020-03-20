import { isNil } from '@antv/util';
import { Formatter } from '../interface/config';

export const combineFormatter = (...formatters: Formatter[]) => (text: string, item: any, idx) =>
  formatters.reduce((curText, formatter) => formatter(curText, item, idx), text);

export const getNoopFormatter = () => (text: string) => text;

export const getPrecisionFormatter = (precision?: number) => (text: string) => {
  const num = Number(text);
  return isNaN(num) || isNil(precision) ? text : num.toFixed(precision);
};

export const getSuffixFormatter = (suffix?: string) => (text: string) => {
  return isNil(suffix) ? text : `${text} ${suffix}`;
};
