import { BulletOptions, BulletData } from './types';

type TransFormData = {
  min: number;
  max: number;
  ds: BulletData;
};
/**
 * bullet 处理数据
 * @param options
 */
export function transformData(options: BulletOptions): TransFormData {
  const { data, xField, measureField, rangeField, targetField } = options;
  const ds: BulletData = [];
  const scales: number[] = [];
  data.forEach((item: any, index: number) => {
    // 构建 title * range
    item[rangeField].forEach((d: number, i: number) => {
      const range = i === 0 ? d : item[rangeField][i] - item[rangeField][i - 1];
      ds.push({
        index: String(i),
        title: xField ? item[xField] : String(index), // 没有xField就用索引
        range,
      });
    });
    // 构建 title * measure
    item[measureField].forEach((d: number, i: number) => {
      ds.push({
        index: String(i),
        title: xField ? item[xField] : String(index),
        measure: d,
      });
    });
    // 构建 title * target
    ds.push({
      index: String(index),
      title: xField ? item[xField] : String(index),
      target: item[targetField],
    });
    // 为了取最大值和最小值，先存储
    scales.push(item[rangeField], item[measureField], item[targetField]);
  });
  // scales 是嵌套的需要拍平
  let min = Math.min(...scales.flat(Infinity));
  const max = Math.max(...scales.flat(Infinity));
  // min 大于 0 从 0 开始
  min = min > 0 ? 0 : min;

  return { min, max, ds };
}
