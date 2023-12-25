import { TRANSFORM_SIGN } from '../constants';
import type { Adaptor } from '../types';
import { isArray } from './index';

export const filterTransformed = (params: Adaptor) => {
  const { options } = params;
  const { children = [] } = options;

  children.forEach((child) => {
    Object.keys(child).forEach((key) => {
      if (isArray(child[key]) && key !== 'data') {
        child[key] = child[key].filter((item) => !item[TRANSFORM_SIGN]);
      }
    });
  });
  return options;
};
