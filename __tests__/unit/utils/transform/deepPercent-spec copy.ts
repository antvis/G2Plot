import { getDeepPercent } from '../../../../src/utils/transform/percent';

describe('deepPercent', () => {
  it('keep order, only calculate number value', () => {
    const data = [
      { time: '09', key: '有小车有任务', type: '时限1', value: 1 },
      { time: '09', key: '无小车有任务', type: '时限1', value: 1 },
      { time: '09', key: '有小车有任务', type: '时限1', value: 1 },
      { time: '09', key: '无小车无任务', type: '时限1', value: 1 },
      { time: '09', key: '有小车有任务', type: '时限2', value: 1 },
      { time: '09', key: '无小车无任务', type: '时限2', value: NaN },
      { time: '10', key: '有小车有任务', type: '时限3', value: 1 },
      { time: '10', key: '无小车无任务', type: '时限3', value: 1 },
      { time: '10', key: '有小车有任务', type: '时限4', value: 'a' },
      { time: '10', key: '无小车有任务', type: '时限4', value: 1 },
      { time: '10', key: '有小车有任务', type: null, value: 1 },
      { time: '10', key: '无小车有任务', type: null, value: null },
    ];

    expect(getDeepPercent(data, 'value', ['time', 'type'], 'value')).toEqual([
      { time: '09', key: '有小车有任务', type: '时限1', value: 0.25 },
      { time: '09', key: '无小车有任务', type: '时限1', value: 0.25 },
      { time: '09', key: '有小车有任务', type: '时限1', value: 0.25 },
      { time: '09', key: '无小车无任务', type: '时限1', value: 0.25 },
      { time: '09', key: '有小车有任务', type: '时限2', value: 1 },
      { time: '09', key: '无小车无任务', type: '时限2', value: 0 },
      { time: '10', key: '有小车有任务', type: '时限3', value: 0.5 },
      { time: '10', key: '无小车无任务', type: '时限3', value: 0.5 },
      { time: '10', key: '有小车有任务', type: '时限4', value: 0 },
      { time: '10', key: '无小车有任务', type: '时限4', value: 1 },
      { time: '10', key: '有小车有任务', type: null, value: 1 },
      { time: '10', key: '无小车有任务', type: null, value: 0 },
    ]);
  });
});
