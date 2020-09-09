import { BulletOptions } from './types';

type TransformData = {
  min: number;
  max: number;
  ds: any[];
};
/**
 * bullet 处理数据
 * @param options
 */
export function transformData(options: BulletOptions): TransformData {
  const { data, xField, measureField, rangeField, targetField } = options;
  const ds: any[] = [];
  const scales: number[] = [];
  data.forEach((item: any, index: number) => {
    // 构建 title * range
    item[rangeField].forEach((d: number, i: number) => {
      const range = i === 0 ? d : item[rangeField][i] - item[rangeField][i - 1];
      ds.push({
        index: String(i),
        [xField]: xField ? item[xField] : String(index), // 没有xField就用索引
        [rangeField]: range,
      });
    });
    // 构建 title * measure
    item[measureField].forEach((d: number, i: number) => {
      ds.push({
        index: String(i),
        [xField]: xField ? item[xField] : String(index),
        [measureField]: d,
      });
    });
    // 构建 title * target
    ds.push({
      index: String(index),
      [xField]: xField ? item[xField] : String(index),
      [targetField]: item[targetField],
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
