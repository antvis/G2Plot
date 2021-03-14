import { percent } from '../../../../src/utils/transform/percent';

describe('percent', () => {
  it('keep order, only calculate number value', () => {
    const data = [
      { time: '09', key: '有小车有任务', type: null, value: 1 },
      { time: '09', key: '无小车有任务', type: null, value: 1 },
      { time: '10', key: '有小车有任务', type: null, value: 1 },
      { time: '10', key: '无小车无任务', type: null, value: 1 },
      { time: '11', key: '有小车有任务', type: null, value: 1 },
      { time: '11', key: '无小车无任务', type: null, value: NaN },
      { time: '12', key: '有小车有任务', type: null, value: 1 },
      { time: '12', key: '无小车无任务', type: null, value: 1 },
      { time: '13', key: '有小车有任务', type: null, value: 'a' },
      { time: '13', key: '无小车有任务', type: null, value: 1 },
      { time: '00', key: '有小车有任务', type: null, value: 1 },
      { time: '00', key: '无小车有任务', type: null, value: null },
    ];

    expect(percent(data, 'value', 'time', 'value')).toEqual([
      { time: '09', key: '有小车有任务', type: null, value: 0.5 },
      { time: '09', key: '无小车有任务', type: null, value: 0.5 },
      { time: '10', key: '有小车有任务', type: null, value: 0.5 },
      { time: '10', key: '无小车无任务', type: null, value: 0.5 },
      { time: '11', key: '有小车有任务', type: null, value: 1 },
      { time: '11', key: '无小车无任务', type: null, value: 0 },
      { time: '12', key: '有小车有任务', type: null, value: 0.5 },
      { time: '12', key: '无小车无任务', type: null, value: 0.5 },
      { time: '13', key: '有小车有任务', type: null, value: 0 },
      { time: '13', key: '无小车有任务', type: null, value: 1 },
      { time: '00', key: '有小车有任务', type: null, value: 1 },
      { time: '00', key: '无小车有任务', type: null, value: 0 },
    ]);
  });
});
