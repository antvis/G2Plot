import { getAdjustAppendPadding, resolveAllPadding } from '../../../src/utils/padding';

describe('getAdjustAppendPadding', () => {
  it('default position: bottom', () => {
    expect(getAdjustAppendPadding(undefined)).toStrictEqual([0, 0, 25, 0]);
    expect(getAdjustAppendPadding(10)).toStrictEqual([10, 10, 35, 10]);
    expect(getAdjustAppendPadding([10])).toStrictEqual([10, 10, 35, 10]);
    expect(getAdjustAppendPadding([10, 20])).toStrictEqual([10, 20, 35, 20]);
    expect(getAdjustAppendPadding([10, 20, 30])).toStrictEqual([10, 20, 55, 20]);
    expect(getAdjustAppendPadding([10, 20, 30, 40])).toStrictEqual([10, 20, 55, 40]);
  });

  it('position: top', () => {
    expect(getAdjustAppendPadding(undefined, 'top')).toStrictEqual([25, 0, 0, 0]);
    expect(getAdjustAppendPadding(10, 'top')).toStrictEqual([35, 10, 10, 10]);
    expect(getAdjustAppendPadding([10], 'top')).toStrictEqual([35, 10, 10, 10]);
    expect(getAdjustAppendPadding([10, 20], 'top')).toStrictEqual([35, 20, 10, 20]);
    expect(getAdjustAppendPadding([10, 20, 30], 'top')).toStrictEqual([35, 20, 30, 20]);
    expect(getAdjustAppendPadding([10, 20, 30, 40], 'top')).toStrictEqual([35, 20, 30, 40]);
  });

  it('position: left', () => {
    expect(getAdjustAppendPadding(undefined, 'left')).toStrictEqual([0, 0, 0, 25]);
    expect(getAdjustAppendPadding(10, 'left')).toStrictEqual([10, 10, 10, 35]);
    expect(getAdjustAppendPadding([10], 'left')).toStrictEqual([10, 10, 10, 35]);
    expect(getAdjustAppendPadding([10, 20], 'left')).toStrictEqual([10, 20, 10, 45]);
    expect(getAdjustAppendPadding([10, 20, 30], 'left')).toStrictEqual([10, 20, 30, 45]);
    expect(getAdjustAppendPadding([10, 20, 30, 40], 'left')).toStrictEqual([10, 20, 30, 65]);
  });

  it('position: right', () => {
    expect(getAdjustAppendPadding(undefined, 'right')).toStrictEqual([0, 25, 0, 0]);
    expect(getAdjustAppendPadding(10, 'right')).toStrictEqual([10, 35, 10, 10]);
    expect(getAdjustAppendPadding([10], 'right')).toStrictEqual([10, 35, 10, 10]);
    expect(getAdjustAppendPadding([10, 20], 'right')).toStrictEqual([10, 45, 10, 20]);
    expect(getAdjustAppendPadding([10, 20, 30], 'right')).toStrictEqual([10, 45, 30, 20]);
    expect(getAdjustAppendPadding([10, 20, 30, 40], 'right')).toStrictEqual([10, 45, 30, 40]);
  });

  it('append: 5', () => {
    expect(getAdjustAppendPadding(undefined, 'top', 5)).toStrictEqual([5, 0, 0, 0]);
    expect(getAdjustAppendPadding(10, 'top', 5)).toStrictEqual([15, 10, 10, 10]);
    expect(getAdjustAppendPadding([10], 'top', 5)).toStrictEqual([15, 10, 10, 10]);
    expect(getAdjustAppendPadding([10, 20], 'top', 5)).toStrictEqual([15, 20, 10, 20]);
    expect(getAdjustAppendPadding([10, 20, 30], 'top', 5)).toStrictEqual([15, 20, 30, 20]);
    expect(getAdjustAppendPadding([10, 20, 30, 40], 'top', 5)).toStrictEqual([15, 20, 30, 40]);
  });
});

describe('resolveAllPadding', () => {
  expect(resolveAllPadding([2, 4])).toEqual([6, 6, 6, 6]);
  expect(resolveAllPadding([[1, 2, 2, 1], 4])).toEqual([5, 6, 6, 5]);
  expect(resolveAllPadding([[1, 2, 2, 1], 'auto'])).toEqual([1, 2, 2, 1]);
  expect(
    resolveAllPadding([
      [1, 2, 2, 1],
      [2, 3, 3, 3],
    ])
  ).toEqual([3, 5, 5, 4]);
});
