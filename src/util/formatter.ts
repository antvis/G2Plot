import { isNil } from '@antv/util';
import { Formatter } from '../interface/config';

export const combineFormatter = (...formatters: Formatter[]) => (text: string, item: any, idx) =>
  formatters.reduce((curText, formatter) => formatter(curText, item, idx), text);

export const getNoopFormatter = () => (text: string, item: any, idx: number) => text;

export const getPrecisionFormatter = (precision?: number) => (text: string, item: any, idx: number) => {
  const num = Number(text);
  return isNaN(num) || isNil(precision) ? text : num.toFixed(precision);
};

export const getSuffixFormatter = (suffix?: string) => (text: string, item: any, idx) => {
  return isNil(suffix) ? text : `${text} ${suffix}`;
};
