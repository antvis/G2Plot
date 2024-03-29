import DataSet from '@antv/data-set';
import { groupBy } from '@antv/util';
import { binHistogram } from '../../../../src/utils/transform/histogram';
import { histogramData, histogramStackData } from '../../../data/histogram-data';

const ds = new DataSet();
const dv = ds.createView().source(histogramData);

// 基本
dv.transform({
  type: 'bin.histogram',
  field: 'value',
  binWidth: 2,
  as: ['range', 'count'],
});

describe('binHistogram', () => {
  it('binHistogram binWidth', () => {
    expect(binHistogram(histogramData, 'value', 2)).toEqual(dv.rows);
  });
});

const dv2 = ds.createView().source(histogramData);
dv2.transform({
  type: 'bin.histogram',
  field: 'value',
  bins: 4, // binNumber + 1
  as: ['range', 'count'],
});

describe('binHistogram', () => {
  it('binHistogram binNumber', () => {
    expect(binHistogram(histogramData, 'value', undefined, 5)).toEqual(dv2.rows);
  });
});

// stack 处理数据
const dv3 = ds.createView().source(histogramStackData);

dv3.transform({
  type: 'bin.histogram',
  field: 'value',
  binWidth: 2,
  groupBy: ['type'],
  as: ['range', 'count'],
});

describe('binHistogram', () => {
  it('binHistogram stack', () => {
    expect(binHistogram(histogramStackData, 'value', 2, undefined, 'type')).toEqual(dv3.rows);
  });
});

// stack binNumber 处理数据
const dv4 = ds.createView().source(histogramStackData);

dv4.transform({
  type: 'bin.histogram',
  field: 'value',
  bins: 4, // binNumber + 1
  groupBy: ['type'],
  as: ['range', 'count'],
});

describe('binHistogram', () => {
  it('binHistogram stack binNumber', () => {
    expect(binHistogram(histogramStackData, 'value', undefined, 5, 'type')).toEqual(dv4.rows);
  });

  it('binNumber is 1', () => {
    expect(binHistogram(histogramStackData, 'value', undefined, 1, 'type').length).toBe(
      Object.values(groupBy(histogramStackData, 'type')).length
    );
  });
});
