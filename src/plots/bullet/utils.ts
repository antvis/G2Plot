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
  const { data, xField, measureField, rangeField, targetField, layout } = options;
  const ds: any[] = [];
  const scales: number[] = [];
  data.forEach((item: any, index: number) => {
    // 构建 title * range
    item[rangeField].sort((a: number, b: number) => a - b);
    item[rangeField].forEach((d: number, i: number) => {
      const range = i === 0 ? d : item[rangeField][i] - item[rangeField][i - 1];
      ds.push({
        rKey: `${rangeField}_${i}`,
        [xField]: xField ? item[xField] : String(index), // 没有xField就用索引
        [rangeField]: range,
      });
    });
    // 构建 title * measure
    item[measureField].forEach((d: number, i: number) => {
      ds.push({
        mKey: item[measureField].length > 1 ? `${measureField}_${i}` : `${measureField}`, // 一个数据就不带索引了
        [xField]: xField ? item[xField] : String(index),
        [measureField]: d,
      });
    });
    // 构建 title * target
    ds.push({
      tKey: `${targetField}`,
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

  // 垂直情况，需要反转数据
  if (layout === 'vertical') {
    ds.reverse();
  }
  return { min, max, ds };
}
