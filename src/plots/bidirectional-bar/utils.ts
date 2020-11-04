import { Datum } from '../../types';
import { BidirectionalBarOptions } from '.';

type TransformData = {
  type: string;
  [key: string]: string | number;
}[];

/**
 * bidirectional-bar 处理数据
 * @param xField
 * @param yField
 * @param data
 */
export function transformData(xField: string, yField: string[], data: Datum): TransformData {
  const hopeData: TransformData = [];
  yField.forEach((d: string) => {
    data.forEach((k: any) => {
      const obj = {
        [xField]: k[xField],
        type: d,
        [d]: k[d],
      };
      hopeData.push(obj);
    });
  });
  return hopeData;
}

/**
 * 是否横向，默认空为横向
 * @param layout
 */
export function isHorizontal(layout: BidirectionalBarOptions['layout']) {
  return layout !== 'vertical';
}
