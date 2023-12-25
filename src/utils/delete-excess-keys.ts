import { TRANSFORM_OPTION_KEY, VIEW_OPTIONS, CONFIG_SHAPE, COORDIANTE_OPTIONS, ANNOTATION_LIST } from '../constants';
import { Options } from '../types';

/**
 * 统一删除已转换的配置项
 */
export const deleteExcessKeys = <O extends Options>(options: O): O => {
  const { children = [] } = options;
  const deleteKeys = Object.keys(TRANSFORM_OPTION_KEY).concat(
    CONFIG_SHAPE.map((item) => item.key),
    COORDIANTE_OPTIONS,
  );
  deleteKeys.forEach((key) => {
    delete options[key];
  });
  /** 针对双轴图、Mix 等复合图表 */
  children.forEach((child) => {
    Object.keys(child).forEach((key) => {
      if (deleteKeys.includes(key)) {
        delete child[key];
      }
    });
  });
  /** 删除不在 View 和自定义 Annotations 里面配置，避免多次 Transform & Scale 等 */
  Object.keys(options).forEach((key) => {
    if (![...VIEW_OPTIONS, ...ANNOTATION_LIST.map((item) => item.key)].includes(key)) {
      delete options[key];
    }
  });
  return options;
};
