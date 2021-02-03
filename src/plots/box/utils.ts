import { map } from '@antv/util';
import { BOX_RANGE } from './constant';
import { BoxOptions } from './types';

/**
 * @desc 将数据转换为 box 需要的的图表数据,如果yField为数组,从data中解构出对应数组值并写入data,否则直接返回data
 * @param data
 * @param yField
 */
export const transformData = (data: BoxOptions['data'], yField: BoxOptions['yField']) => {
  let newData = data;
  // formate data when `yField` is Array
  if (Array.isArray(yField)) {
    const [low, q1, median, q3, high] = yField;
    newData = map(data, (obj) => {
      obj[BOX_RANGE] = [obj[low], obj[q1], obj[median], obj[q3], obj[high]];
      return obj;
    });
  }

  return newData;
};
