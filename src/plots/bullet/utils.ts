import { BulletOptions } from './types';

type TransformData = {
  min: number;
  max: number;
  ds: any[];
};

/**
 * 获取分类字段 key 值 一个分类值的时候， 返回非索引 key 值，在 tooltip 不做索引区分
 * @param values 数据量
 * @param field 指标字段
 * @param index 索引
 * @returns string
 */
function getSeriesFieldKey(values: number[], field: string, index: number): string {
  return values.length > 1 ? `${field}_${index}` : `${field}`;
}

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
    const rangeValues = [item[rangeField]].flat();
    rangeValues.sort((a: number, b: number) => a - b);
    rangeValues.forEach((d: number, i: number) => {
      const range = i === 0 ? d : rangeValues[i] - rangeValues[i - 1];
      ds.push({
        rKey: `${rangeField}_${i}`,
        [xField]: xField ? item[xField] : String(index), // 没有xField就用索引
        [rangeField]: range,
      });
    });

    // 构建 title * measure
    const measureValues = [item[measureField]].flat();
    measureValues.forEach((d: number, i: number) => {
      ds.push({
        mKey: getSeriesFieldKey(measureValues, measureField, i),
        [xField]: xField ? item[xField] : String(index),
        [measureField]: d,
      });
    });

    // 构建 title * target
    const targetValues = [item[targetField]].flat();
    targetValues.forEach((d: number, i: number) => {
      ds.push({
        tKey: getSeriesFieldKey(targetValues, targetField, i),
        [xField]: xField ? item[xField] : String(index),
        [targetField]: d,
      });
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
