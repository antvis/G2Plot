import { groupBy, min, max } from '@antv/util';
import pdf from 'pdfast';
import { quantile } from '../../utils/transform/quantile';
import { ViolinOptions } from './types';

export type ViolinData = {
  /** X轴 */
  x: string;

  /** 小提琴轮廓的 size 通道数据 */
  violinSize: number[];
  /** 小提琴轮廓的 y 通道数据 */
  violinY: number[];

  // 箱线图基础数据
  /** 最大值 */
  high: number;
  /** 最小值 */
  low: number;
  /** 上四分位数 */
  q1: number;
  /** 下四分位数 */
  q3: number;
  /** 箱线图中的中位值 */
  median: number[];

  /** 箱线图中的上线边缘线 */
  minMax: number[];
  /** 箱线图中的上下四分位点 */
  quantile: number[];
};

export type PdfOptions = {
  min: number;
  max: number;
  size: number;
  width: number;
};

export const toBoxValue = (values: number[]) => {
  return {
    low: min(values),
    high: max(values),
    q1: quantile(values, 0.25),
    q3: quantile(values, 0.75),
    median: quantile(values, [0.5]),
    minMax: [min(values), max(values)],
    quantile: [quantile(values, 0.25), quantile(values, 0.75)],
  };
};

export const toViolinValue = (values: number[], pdfOptions: PdfOptions) => {
  const pdfResults: Array<{ x: number; y: number }> = pdf.create(values, pdfOptions);
  return {
    violinSize: pdfResults.map((result) => result.y),
    violinY: pdfResults.map((result) => result.x),
  };
};

export const transformViolinData = (options: ViolinOptions): ViolinData[] => {
  const { xField, yField, seriesField, data, kde } = options;

  /** 生成概率密度函数的配置 */
  const pdfOptions: PdfOptions = {
    min: kde.min,
    max: kde.max,
    size: kde.sampleSize,
    width: kde.width,
  };

  // 无拆分
  if (!seriesField) {
    const group = groupBy(data, xField);
    return Object.keys(group).map((x) => {
      const records = group[x];
      const values = records.map((record) => record[yField]);
      return {
        x,
        ...toViolinValue(values, pdfOptions),
        ...toBoxValue(values),
      };
    });
  }

  // 有拆分
  const resultList: ViolinData[] = [];
  const seriesGroup = groupBy(data, seriesField);
  Object.keys(seriesGroup).forEach((series) => {
    const group = groupBy(seriesGroup[series], xField);
    return Object.keys(group).forEach((key) => {
      const records = group[key];
      const values = records.map((record) => record[yField]);
      resultList.push({
        x: key,
        [seriesField]: series,
        ...toViolinValue(values, pdfOptions),
        ...toBoxValue(values),
      });
    });
  });
  return resultList;
};
