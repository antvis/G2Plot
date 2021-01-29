import { map } from '@antv/util';
import { BOX_RANGE } from './constant';

export const transformData = (data: object[], yField: string[] | string) => {
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
