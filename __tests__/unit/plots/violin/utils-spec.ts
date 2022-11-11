import { group } from '@antv/util';
import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';
import { DEFAULT_OPTIONS } from '../../../../src/plots/violin/constant';
import { PdfOptions, toBoxValue, toViolinValue, transformViolinData } from '../../../../src/plots/violin/utils';
import { BASE_VIOLIN_DATA } from '../../../data/violin';

expect.extend({ toBeDeepCloseTo });

describe('violin utils', () => {
  it('toBoxValue() works correctly.', () => {
    // 顺序数据，可口算结果。
    const ordered = [-1, 2, 3, 4, 4.4, 5, 8, 9, 100];
    // 随机打乱，不应影响计算结果。
    const shuffled = ordered.slice().sort(() => Math.random() - 0.5);
    expect(toBoxValue(shuffled)).toEqual({
      high: 100,
      low: -1,
      q1: 3,
      q3: 8,
      minMax: [-1, 100],
      quantile: [3, 8],
      median: [4.4],
    });
  });

  it('toViolinValue() works correctly.', () => {
    const options: PdfOptions = {
      min: -1,
      max: 10,
      size: 5,
      width: 2,
    };
    // 顺序数据，可笔算结果。
    const ordered = [-1, 2, 3, 4, 4.4, 5, 8, 9, 10];
    // 随机打乱，不应影响计算结果。
    const shuffled = ordered.slice().sort(() => Math.random() - 0.5);
    // @ts-ignore
    expect(toViolinValue(shuffled, options)).toBeDeepCloseTo(
      {
        violinY: [-1 + (11 / 4) * 0, -1 + (11 / 4) * 1, -1 + (11 / 4) * 2, -1 + (11 / 4) * 3, -1 + (11 / 4) * 4],
        violinSize: [
          0.18518518518518517, 0.287037037037037, 0.22222222222222218, 0.17592592592592587, 0.12962962962962957,
        ],
      },
      0.0001
    );
  });

  it('transformViolinData() results in correct length.', () => {
    const dataWithoutSeries = transformViolinData({
      ...DEFAULT_OPTIONS,
      data: BASE_VIOLIN_DATA,
      xField: 'type',
      yField: 'value',
    });
    const dataWithSeries = transformViolinData({
      ...DEFAULT_OPTIONS,
      data: BASE_VIOLIN_DATA,
      xField: 'type',
      yField: 'value',
      seriesField: 'species',
    });

    expect(dataWithoutSeries.length).toBe(group(BASE_VIOLIN_DATA, ['type']).length);
    expect(dataWithSeries.length).toBe(group(BASE_VIOLIN_DATA, ['type', 'species']).length);
  });
});
