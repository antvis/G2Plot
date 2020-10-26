import { Datum } from '../../types';

type FormatData = {
  type: string;
  value: number;
  [key: string]: string | number;
}[];
/**
 * bidirectional-bar 处理数据
 * @param options
 */
export function transformData(xField: string, yField: string[], data: Datum): FormatData {
  const hopeData: FormatData = [];
  yField.forEach((d: string) => {
    data.forEach((k: any) => {
      const obj = {
        [xField]: k[xField],
        value: k[d],
        type: d,
      };
      hopeData.push(obj);
    });
  });
  return hopeData;
}
